import Button from '@mui/material/Button';
import React from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';


const UserHome = () => { 
    const navigate = useNavigate();
    function Handleclick(v){
    navigate(v);
    }

    return (
        <>
            <div className="form-body" style={{height:"100vh"}}>
                <div className="form-items">
                    <div class="container" className="profilepanel" style={
                        {
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            justifyContent:"center",
                            height:"100vh",
                        }}>
                            <div class="container" className="profilepanel" style={
                                {
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center",
                                    justifyContent:"space-between",
                                    height:"50%",
                                }}>
                                    <Button className="LocationButtons" color="error" variant="contained" onClick= {() => Handleclick('/UserAjman')}>
                                        Ajman
                                    </Button>

                                    <Button className="LocationButtons" color="error" variant="contained" onClick= {() => Handleclick('/UserSharjah')}>
                                        Sharjah
                                    </Button>

                                    <Button className="LocationButtons" color="error" variant="contained" onClick= {() => Handleclick('/UserDubai')}>
                                        Dubai
                                    </Button>

                                    <Button className="LocationButtons" color="error" variant="contained" onClick= {() => Handleclick('/UserAbuDhabi')}>
                                        Abu Dhabi
                                    </Button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHome