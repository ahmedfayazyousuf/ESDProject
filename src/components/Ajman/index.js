import { useEffect } from "react"
import { useState } from "react"
import firebase from '../../firbase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const Ajman = () => {
    const [user, setUser] = useState([])
    const [file, setFile] = useState("");

    const getData = async () =>{


        // await axios.get("http://localhost:4000/user_accepted").then(res => {
        //     console.log(res.data);
        //     setUser([res.data]);
        // });
    //     const res = await fetch(`http://localhost:4000/user_accepted`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })

    // const data = await res.json();
    // setUser(data)

    const Location = firebase.firestore().collection("Location").doc('Ajman');

    const Cars = Location.collection('Cars').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        setUser(current => [...current, doc.data()]);
    });

    console.log(user)

    })

    // console.log(Cars)
    }
    var count = 0;
    useEffect(()=>{

        if(count===0)
        getData();

        count++;
    },[])

    function popup(){
        var popup = document.getElementById("popup").style
        popup.display = "flex";
        popup.opacity = 1;
        popup.zIndex = 100;
 
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
               const Location = firebase.firestore().collection("Location").doc('Ajman');

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
    
    return(
        <div style={{
            display:"flex",
            flexDirection:"column",
            height:"100vh",
            justifyContent:"center",
            alignItems:"center"
        }}>,
            <div style={{
            display:"flex",
            flexDirection:"column",
            height:"50%",
            justifyContent:"center",
            alignItems:"center"
        }}>
                <h1 style={{color:"white"}}>Cars Available</h1>
                <table style={{color:"white"}}>
                <thead>
                    <tr>
                        <th>Car</th>
                        <th>Model</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user) => {
                        return <tr key={user.name}>
                        <td>{user.name}</td>
                        <td>{user.model}</td>
                        </tr> 
                    })}
                </tbody>
            </table>
            </div>

            <div style={{width:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
            }}>
                <button style={{width:"30%"}} onClick={popup}>Add Car</button>
            </div>

            <div className='popup' id='popup' style={{
                position:"absolute",
                width: "44%",
                height: "50%",
                transition: "1s",
                opacity:"0",
                display:"flex",
                flexDirection: "column",
                justifyContent:"center",
                alignItems:"center",
                background:"blue",
                zIndex:"-1",
                marginTop:"0"
            }}
            >
                <label>Add Car</label>

                <span style={{marginBottom: "2%"}}>Upload Image: </span>

                <input id="image-file" accept="image/*" type="file" onChange={handleChange}
                    style={{
                        color: 'white',
                        marginBottom: "2%"
                    }}

                    
                    ></input>

                <input style={{width:"30%"}} id="name" placeholder="Enter Car Name">

                </input>

                <input style={{width:"30%"}} id="model" placeholder="Enter Car Model">
                    
                </input>

                <button style={{width:"30%",height:"15%"}} onClick={addCars}> Send</button>
            </div>
        </div>
    )
}

export default Ajman