"use client";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import GlobalContext from "../context/Context";
import { auth, db } from "../../app/firebase";
import {
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const GlobalContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cv, setCV] = useState([]);
  const [picture, setPicture] = useState([]);

  const [scholarLink, setScholarLink] = useState("");
  const [ORCID, setORCID] = useState("");
  const [researchGate, setResearchGate] = useState("");
  const [about, setAbout] = useState("");

  const [researchMainOverview, setResearchMainOverview] = useState("");
  const [researchType, setResearchType] = useState("");
  const [researchOverview, setResearchOverview] = useState("");
  const [researchs, setResearchs] = useState([]);
  const [researchId, setResearchId] = useState("");
  const [
    showUpdateResearchsOverviewDialog,
    setShowUpdateResearchsOverviewDialog,
  ] = useState(false);

  const [teachingYear, setTeachingYear] = useState("2021");
  const [postgradCourses, setPostGradCourses] = useState("");
  const [undergradCourses, setUnderGradCourses] = useState("");
  const [courses, setCourses] = useState([]);
  const [showUpdateCoursesDialog, setShowUpdateCoursesDialog] = useState(false);

  const [supervisionType, setSupervisionType] = useState("");
  const [supervisionContent, setSupervisionContent] = useState("");
  const [supervisionContentId, setSupervisionContentId] = useState("");
  const [supervisions, setSupervisions] = useState([]);
  const [showUpdateSupervisionsDialog, setShowUpdateSupervisionsDialog] =
    useState(false);

  const [publicationType, setPublicationType] = useState("");
  const [publicationOverview, setPublicationOverview] = useState("");
  const [publicationContent, setPublicationContent] = useState("");
  const [publicationContentId, setPublicationContentId] = useState("");
  const [publications, setPublications] = useState([]);
  const [publicationIdsAndTypes, setPublicationIdsAndTypes] = useState([]);
  const [publicationId, setPublicationId] = useState("");
  const [
    showUpdatePublicationsOverviewDialog,
    setShowUpdatePublicationsOverviewDialog,
  ] = useState(false);

  const [selectedPTIndex, setSelectedPTIndex] = useState("");
  const [selectedPCIndex, setSelectedPCIndex] = useState("");
  const [showUpdatePublicationDialog, setShowUpdatePublicationDialog] =
    useState(false);

  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authState, setAuthState] = useState("pending");

  const [activeSection, setActiveSection] = useState("home");

  const [userDataStatus, setUserDataStatus] = useState("loading");
  const [imageLoaded, setImageLoaded] = useState(false);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setLoggedInUser(authUser);
        setAuthState("authenticated");
      } else {
        setLoggedInUser(null);
        setAuthState("unauthenticated");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "user"));
    const unsub = onSnapshot(q, (snapshot) => {
      let shots = snapshot.docs.map((doc) => doc.data());
      let userData = shots[0];
      setCV(userData.cv);
      setPicture(userData.picture);
      setScholarLink(userData.scholar);
      setORCID(userData.ORCID);
      setResearchGate(userData.researchGate);
      setAbout(userData.about);
      setResearchMainOverview(userData.researchMainOverview);
      setUserDataStatus("hasData");
    });
    return () => unsub;
  }, [authState]);

  useEffect(() => {
    const q = query(collection(db, "teaching"));
    const unsub = onSnapshot(q, (snapshot) => {
      let shots = snapshot.docs.map((doc) => doc.data());
      let sortedShots = shots.sort((a, b) => b.teachingYear - a.teachingYear);
      setCourses(sortedShots);
    });
    return () => unsub;
  }, []);

  useEffect(() => {
    const q = query(collection(db, "researchs"));
    const unsub = onSnapshot(q, (snapshot) => {
      let shots = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setResearchs(shots);
    });
    return () => unsub;
  }, []);

  useEffect(() => {
    const getSupervisions = () => {
      const q = query(
        collection(db, "supervisions"),
        orderBy("createdAt", "desc")
      );
      const unsub = onSnapshot(q, async (snapshot) => {
        let supervisionTypesData = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        await Promise.all(
          supervisionTypesData.map(async (supervisionTypeData) => {
            const supervisionq = query(
              collection(
                db,
                "supervisions",
                supervisionTypeData.id,
                "supervisions"
              ),
              orderBy("createdAt", "desc")
            );
            const supervisionDocs = await getDocs(supervisionq);
            const supervisionData = supervisionDocs.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            return { ...supervisionTypeData, supervisions: supervisionData };
          })
        ).then((supervisions) => {
          setSupervisions(supervisions);
        });
      });
      return () => unsub;
    };

    const onChangeInSupervisions = () => {
      const groupq = collectionGroup(db, "supervisions");
      const unsub = onSnapshot(groupq, (snapshots) => {
        getSupervisions();
      });
      return () => unsub();
    };

    getSupervisions();
    onChangeInSupervisions();
  }, []);

  useEffect(() => {
    const getPublications = () => {
      const q = query(collection(db, "publications"));
      const unsub = onSnapshot(q, async (snapshot) => {
        let publicationTypesData = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        const publicationIdsAndTypes = publicationTypesData.map((data) => {
          return { id: data.id, type: data.type };
        });
        setPublicationIdsAndTypes(publicationIdsAndTypes);

        await Promise.all(
          publicationTypesData.map(async (publicationTypeData) => {
            const publicationq = query(
              collection(
                db,
                "publications",
                publicationTypeData.id,
                "publications"
              ),
              orderBy("createdAt", "desc")
            );
            const publicationDocs = await getDocs(publicationq);
            const publicationData = publicationDocs.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            return { ...publicationTypeData, publications: publicationData };
          })
        ).then((publications) => {
          setPublications(publications);
        });
      });
      return () => unsub;
    };

    const onChangeInPublications = () => {
      const groupq = collectionGroup(db, "publications");
      const unsub = onSnapshot(groupq, (snapshots) => {
        getPublications();
      });
      return () => unsub();
    };

    getPublications();
    onChangeInPublications();
  }, []);

  const value = {
    login,
    logout,
    loggedInUser,

    authState,
    setAuthState,

    email,
    setEmail,
    password,
    setPassword,

    cv,
    setCV,
    picture,
    setPicture,
    scholarLink,
    setScholarLink,
    ORCID,
    setORCID,
    researchGate,
    setResearchGate,
    about,
    setAbout,

    researchMainOverview,
    setResearchMainOverview,
    researchType,
    setResearchType,
    researchOverview,
    setResearchOverview,
    researchs,
    setResearchs,

    researchId,
    setResearchId,

    showUpdateResearchsOverviewDialog,
    setShowUpdateResearchsOverviewDialog,

    teachingYear,
    setTeachingYear,
    postgradCourses,
    setPostGradCourses,
    undergradCourses,
    setUnderGradCourses,

    courses,
    setCourses,
    showUpdateCoursesDialog,
    setShowUpdateCoursesDialog,

    supervisionType,
    setSupervisionType,
    supervisionContent,
    setSupervisionContent,
    supervisions,
    setSupervisions,

    supervisionContentId,
    setSupervisionContentId,

    showUpdateSupervisionsDialog,
    setShowUpdateSupervisionsDialog,

    publicationType,
    setPublicationType,
    publicationOverview,
    setPublicationOverview,
    publicationContent,
    setPublicationContent,
    publicationContentId,
    setPublicationContentId,
    publications,
    setPublications,
    publicationIdsAndTypes,
    setPublicationIdsAndTypes,
    publicationId,
    setPublicationId,

    showUpdatePublicationsOverviewDialog,
    setShowUpdatePublicationsOverviewDialog,

    selectedPTIndex,
    setSelectedPTIndex,
    selectedPCIndex,
    setSelectedPCIndex,
    showUpdatePublicationDialog,
    setShowUpdatePublicationDialog,

    activeSection,
    setActiveSection,

    userDataStatus,
    setUserDataStatus,
    imageLoaded,
    setImageLoaded,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
