import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import _ from "lodash";
import { Box, Button, Grid, TextField } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { animated, useSpring } from 'react-spring';

const SmoothAnimationBar = () => {
  const springs = useSpring({
    from: { width: '0vw' },
    to: { width: '100vw' },
    config: { duration: 2000 },
  })

  return (
    <animated.div
      style={{
        height: '50PX',
        background: '#ff6d6d',
        borderRadius: 8,
        ...springs,
      }}
    />
  );
};

const FluidAnimationBar = () => {
  const springProps = useSpring({
    from: { width: '0vw' },
    to: { width: '100vw' },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      className="bar"
      style={{
        ...springProps,
        backgroundColor: '#28a745',
        height: '50px'
      }}
    />
  );
};

const BezierCurveAnimationBar = () => {
  const springProps = useSpring({
    from: { borderRadius: '0' },
    to: { borderRadius: '50px' },
    config: { duration: 2000 },
  });

  return (
    <animated.div
      className="bar"
      style={{
        ...springProps,
        backgroundColor: '#dc3545',
        width: '100vw',
        height: '50px'
      }}
    />
  );
};

const BarsWithAnimations = () => {
  return (
    <div className="bars-container">

      <div className="bar-container">
        <BezierCurveAnimationBar />
      </div><div className="bar-container">
        <SmoothAnimationBar />
      </div>
      <div className="bar-container">
        <FluidAnimationBar />
      </div>
    </div>
  );
};



function RichTextEditor({ text, setText }) {
  return <ReactQuill theme="snow" value={text} onChange={setText} style={{ margin: '30px', height: '180px' }} />;
}



const CounterApp = () => {
  const [count, setCount] = useState(0)
  const changeCountValue = (opration) => {
    setCount((pre) => {
      if (pre == 0 && opration == 'minus') return 0;
      return opration == 'plus' ? pre + 1 : pre - 1
    })
  }
  return (
    <Box sx={{
      width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #818181', borderRadius: 10, m: 2
    }}>
      <Box>
        <Box textAlign={'center'} mb={3} fontWeight={700} fontSize={20}>Count :- {count}</Box>
        <Button variant="contained" onClick={() => changeCountValue('minus')} sx={{}}>-</Button>
        <Button variant="contained" sx={{ textDecoration: 'none' }} onClick={() => setCount(0)}>Reset</Button>
        <Button variant="contained" onClick={() => changeCountValue('plus')} sx={{}}>+</Button>
      </Box>
    </Box>
  )
}


const DashBoard = (props) => {
  const [username, setUsername] = useState(props.name);
  const [board, setBoard] = useState([]);
  const [boardItem, setBoardItem] = useState("");
  const [toggle, setToggle] = useState(false);
  const [submit, setSubmit] = useState(true);
  const [logout, setLogout] = useState(false);
  const [loggedInUserObj, setLoggedInUserObj] = useState({});
  const [trigar, setTrigar] = useState(true)
  const [text, setText] = useState({})
  const [user, setUser] = useState({
    name: '',
    address: '',
    email: '',
    id: generateUniqueId(),
    phone: '',
    object: ''
  })

  useEffect(() => {
    const loggedInUserName = _.get(props.location, "state.userName", {});
    setLoggedInUserObj(JSON.parse(localStorage.getItem(loggedInUserName)));
  }, [props.location.state.userName]);

  const onLogoutYes = () => {
    setSubmit(false);
    setToggle(true);
    const userObj = JSON.parse(
      localStorage.getItem(_.get(loggedInUserObj, "userName", ""))
    );
    userObj.isUserLoggedIn = false;
    localStorage.setItem(_.get(loggedInUserObj, "userName", ""), JSON.stringify(userObj));
  };

  const onLogout = () => {
    setLogout(!logout);
  };

  function generateUniqueId() {
    const timestamp = Math.random();
    const uniqueId = `UniqueId_${timestamp}`;
    return uniqueId;
  }

  useEffect(() => {
    const temp = ` Name    :- ${user?.name ? user?.name : ''} </br>
                  Address :- ${user?.address ? user?.address : ''}</br>
                  Email   :- ${user?.email ? user?.email : ''}</br>
                  Phone   :- ${user?.phone ? user?.phone : ''}</br>
                  Id      :- ${user?.id ? user?.id : ''}`
    setText(temp)
  }, [user])

  useEffect(() => {
    setText(JSON.parse(localStorage.getItem('text')))
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  const onSubmit = () => {
    if (!user?.name || !user?.address || !user?.phone || !user?.email) {
      return;
    }
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('text', JSON.stringify(text))
    setUser({
      name: '',
      address: '',
      email: '',
      id: generateUniqueId(),
      phone: '',
      object: ''
    })
  }


  const handleChangeValue = (key, value) => {
    setUser({
      ...user,
      [key]: value
    })
  }
  const localUname = `${_.get(loggedInUserObj, "firstName", "")} ${_.get(loggedInUserObj, "lastName", "")}`;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <h1 style={{ color: '#fff', fontSize: '20px' }}>Welcome {localUname}</h1>
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active text-right" onClick={onLogout}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onLogout}
                  style={{ backgroundColor: 'green' }}
                >
                  LOGOUT
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Grid container sx={{ bgcolor: '#F1F1F1' }}>
        <Grid lg={6} xs={12}>
          <CounterApp />
        </Grid>
        <Grid lg={6} xs={12}>
          <RichTextEditor text={text} setText={setText} />

        </Grid>
        <Grid lg={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 20, mt: 5 }}>
            <Box m={5} >
              <TextField name="object" placeholder="enter object" fullWidth value={user?.object} onChange={(e) => handleChangeValue(e.target.name, e.target.value)} />
              <TextField name="name" placeholder="enter name" fullWidth value={user?.name} onChange={(e) => handleChangeValue(e.target.name, e.target.value)} sx={{ my: 2 }} />
              <TextField name="id" placeholder="enter id" fullWidth disabled value={user?.id} onChange={(e) => handleChangeValue(e.target.name, e.target.value)} />

            </Box>
            <Box m={5} >
              <TextField name="address" placeholder="enter address" fullWidth value={user?.address} onChange={(e) => handleChangeValue(e.target.name, e.target.value)} />
              <TextField name="email" type="email" placeholder="enter email" fullWidth value={user?.email} onChange={(e) => handleChangeValue(e.target.name, e.target.value)} sx={{ my: 2 }} />
              <TextField name="phone" type="number" placeholder="enter phone" fullWidth value={user?.phone} onChange={(e) => handleChangeValue(e.target.name, e.target.value)} />
            </Box>
          </Box>
          <Box textAlign={'center'} my={2}>
            <Button variant="contained" onClick={() => {
              setTrigar(false)
              setTimeout(() => {
                setTrigar(true)
              }, 1000)
            }} sx={{ mr: 2 }}>check animation</Button>
            <Button variant="contained" onClick={onSubmit}>save</Button>
          </Box>
        </Grid>
      </Grid>

      {trigar &&
        <BarsWithAnimations />}
      {!submit && <Redirect to={`/`} />}
      {logout && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes"
          confirmBtnBsStyle="warning"
          title={localStorage.getItem('user') == JSON.stringify(user) && localStorage.getItem('text') == JSON.stringify(text) ? "Are you sure?" : "Do you want to save these changes ?"}
          onConfirm={onLogoutYes}
          onCancel={onLogout}
          focusCancelBtn
        ></SweetAlert>
      )}
    </div>
  );
};

export default DashBoard;
