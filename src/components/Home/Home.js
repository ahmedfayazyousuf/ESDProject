import Button from '@mui/material/Button';
import React from 'react';
import "./Home.css";
import { useNavigate } from 'react-router-dom';


const Home = () => { 
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
                                    <Button className="LocationButtons" color="error" variant="contained" onClick= {() => Handleclick('/Ajman')}>
                                        Ajman
                                    </Button>

                                    <Button className="LocationButtons" color="error" variant="contained" onClick= {() => Handleclick('/Sharjah')}>
                                        Sharjah
                                    </Button>

                                    <Button className="LocationButtons" color="error" variant="contained" onClick= {() => Handleclick('/Dubai')}>
                                        Dubai
                                    </Button>

                                    <Button className="LocationButtons" color="error" variant="contained" onClick= {() => Handleclick('/AbuDhabi')}>
                                        Abu Dhabi
                                    </Button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home