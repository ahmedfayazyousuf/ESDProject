import { useNavigate } from 'react-router-dom';
import './AbuDhabi.css'
import { useEffect } from "react"
import { useState } from "react"
import firebase from '../../firbase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const AbuDhabi = () => {
    const [user, setUser] = useState([])
    const [file, setFile] = useState("");
    const [userID, setUserID] = useState([])

    const getData = async () =>{
    const Location = firebase.firestore().collection("Location").doc('AbuDhabi');
    // eslint-disable-next-line
    const Cars = Location.collection('Cars').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        setUser(current => [...current, doc.data()]);
    });
    console.log(user)
    })
    }
    var count = 0;
    useEffect(()=>{

        if(count===0)
        getData();

        count++;
        // eslint-disable-next-line
    },[])

    function popup(){
        var popup = document.getElementById("popup").style
        popup.display = "flex";
        popup.opacity = 1;
        popup.zIndex = 100;
     }

     function closepopup(){
        var popup = document.getElementById("popup").style
        popup.display = "flex";
        popup.opacity = 0;
        popup.zIndex = -10;
     }

     function handleChange(event) {
        setFile(event.target.files[0]);
    }

     function addCars(){
        
        var name = document.getElementById('name').value
        var model = document.getElementById('model').value


        const storage = getStorage();
        var storagePath = 'uploads/' + file.name ;
        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            // progrss function ....
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, 
          (error) => { 
            // error function ....
            console.log(error);
          }, 
          () => {
            // complete function ....
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
               const Location = firebase.firestore().collection("Location").doc('AbuDhabi');

                Location.collection('Cars').add({
                    imageURL:downloadURL,
                    name:name,
                    model:model
                })
            });
          });
        var popup = document.getElementById("popup").style
        popup.display = "flex";
        popup.opacity = 0;
        popup.zIndex = -1;
     }

     const navigate = useNavigate();

    
    return(
        <div style={{display:"flex",flexDirection:"column",height:"100vh",alignItems:"center"}}>,
            <div className="cards">
                    <h1>Available Cars</h1>
                    <div className="services">
                        {user.map((user,index) => {
                            return <div className="content content-1">
                            <div className="fab"></div>
                                <img src={user.imageURL} alt="car" style={{height: '150px', width: '200px'}}/>
                                <h2>{user.name}</h2>
                                <p>{user.model}</p>
                            </div>
                        })}
                    </div>
                </div>

            <div style={{width:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
            }}>
                <button style={{width:"30%"}} onClick={popup}>Add Car</button>
            </div>

            <div className='popup' id='popup' style={{position:"absolute",width: "44%",height: "50%",transition: "1s",opacity:"0",display:"flex",flexDirection: "column",justifyContent:"center",alignItems:"center",background:"blue",zIndex:"-1",marginTop:"0"}}>
                <label>Add Car</label>
                <span style={{marginBottom: "2%"}}>Upload Image: </span>
                <input id="image-file" accept="image/*" type="file" onChange={handleChange} style={{color: 'white',marginBottom: "2%"}}></input>
                <input style={{width:"30%"}} id="name" placeholder="Enter Car Name"></input>
                <input style={{width:"30%"}} id="model" placeholder="Enter Car Model"></input>
                <button style={{width:"30%",height:"15%"}} onClick={addCars}> Send</button>
                <button style={{width:"30%",height:"15%"}} onClick={closepopup}> Close</button>
            </div>
        </div>
    )
}

export default AbuDhabi