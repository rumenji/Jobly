
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import CompaniesList from "./Components/Companies/CompaniesList";
import CompanyDetails from "./Components/Companies/CompanyDetails";
import JobsList from './Components/Jobs/JobsList';
import Home from './Components/Home';
import LoginForm from './Auth/LoginForm';
import JoblyApi from './Helpers/useAxios';
import useLocalStorage from './Auth/useLocalStorage';
import { jwtDecode } from "jwt-decode";
import UserContext from './Auth/UserContext';
import Loading from './Helpers/isLoading';
import ProtectedRoute from './Components/ProtectedRoute';
import SignupForm from './Auth/SignupForm';
import ProfileEditForm from './Auth/ProfileEditForm';

function App() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [token, setToken] = useLocalStorage('jobly-token');
  const [currUser, setCurrUser] = useState(null);
  const [userApplications, setUserApplications] = useState(new Set([]));


  const login = async (loginCredentials) => {
    try {
      const token = await JoblyApi.login(loginCredentials);
      setToken(token);
      return { success: true }
    } catch (e) {
      return { success: false, e }
    }
  };

  const signup = async (signupCredentials) => {
    try {
      const token = await JoblyApi.signup(signupCredentials);
      setToken(token);
      return { success: true }
    } catch (e) {
      return { success: false, e }
    }
  }

  const editProfile = async (editedData, username) => {
    try {
      const user = await JoblyApi.editProfile(editedData, username);
      setCurrUser(user)
      return { success: true }
    } catch (e) {
      return { success: false, e }
    }
  }

  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          JoblyApi.token = token;
          const currentUser = await JoblyApi.getCurrentUser(username);
          setCurrUser(currentUser);
          setUserApplications(new Set(currentUser.applications))
        } catch (e) {
          console.error(e)
          setCurrUser(null)
        }
      }
      setHasLoaded(true);
    };
    setHasLoaded(false)
    getCurrUser();
  }, [token])

  const logout = () => {
    setCurrUser(null);
    setToken(null);
  }

  const applyToJob = async (jobId) => {
    try {
      if (hasApplied(jobId)) return;
      await JoblyApi.applyToJob(currUser.username, jobId);
      setUserApplications(new Set([...userApplications, jobId]));
      return { sucess: true }
    } catch (e) {
      return { success: false, e }
    }
  };

  const hasApplied = (jobId) => {
    return userApplications.has(jobId)
  }

  if (!hasLoaded) return <Loading />

  return (

    <BrowserRouter>
      <UserContext.Provider value={{ currUser, setCurrUser, applyToJob, hasApplied }}>
        <div className='App'>
          <NavBar logout={logout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />} >
              <Route path="/companies" element={<CompaniesList />} />
              <Route path="/companies/:handle" element={<CompanyDetails />} />
              <Route path="/jobs" element={<JobsList />} />
              <Route path="/profile" element={<ProfileEditForm editProfile={editProfile} />} />
            </Route>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
