const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const Signup = require("./Modals/Signup");
const bodyParser = require('body-parser');
const App = express();
const Doctor = require("./Modals/Doctor");
const Patient = require("./Modals/Patient");
const Employee = require("./Modals/Employee");
const Recaptionist = require("./Modals/Recaptionist");
const Accountant = require("./Modals/Accountant");
const Department = require("./Modals/Department");
const Medicine = require("./Modals/Medicine");
const Lab = require("./Modals/Lab");
const bcrypt = require("bcryptjs");
const jwt_secretkey = "udhgeugbfyegfuefy8i9efyiuekbfepot04i8-y04589y=-5o-yp[5'y;5'yl5piy9pu7gt8yehbcm "
const jwt = require("jsonwebtoken");
let multer = require("multer");


// App.use(express.static('src'))
// App.use(express.urlencoded({ extended: false }));
App.use(express.json())
App.use(express.json());
App.use(cors());
// App.use(bodyParser.urlencoded({ extended: false }))
App.use(bodyParser.json())


mongoose.connect("mongodb+srv://yogita:yogitaa@cluster0.vbuxtwd.mongodb.net/hospital", {
})
  .then(() => {
    App.listen(8000, () => {
      console.log("Server is running on http://localhost:8000");
    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));



App.get("/", (req, res) => {
  res.send("Here is the Hospital Management system Details of yogita kohli ");
});


/////////////////////////////Admin Penal start  ///////////////////////////////////////////////////////////////////







// POST: admin login
App.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Signup.findOne({ email });
  if (!admin) {
    return res.json({ error: "user not found" })
  }
  if (await bcrypt.compare(password, admin.password)) {
    const token = jwt.sign({ email: admin.email }, jwt_secretkey);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" })
    }
  }
  res.json({ status: "success" })
  console.log("admin login data")
})

App.post("/admindata", async (req, res) => {
  const { token } = req.body;
  try {
    const admindata = jwt.verify(token, jwt_secretkey);
    const adminemail = admindata.email;
    Signup.findOne({ email: adminemail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error ", data: error });
      });
  } catch (error) { }
})


// POST: admin signup

App.post("/signup", async (req, res) => {
  const { name, email, password, phone, Gender,images } = req.body;
  const encryptedpass = await bcrypt.hash(password, 10);
  try {
    const olduser = await Signup.findOne({ email });
    if (olduser) {
      return res.json({ error: "user existed" });
    }
    await Signup.create({
      name,
      email,
      password: encryptedpass,
      phone,
      images,
      Gender
    })
    res.send({ status: "ok" })
  } catch (error) {
    res.send({ status: "error" })
  }
});



// GET: admin All signup documents
App.get("/signup", async (req, res) => {
  try {
    const docs = await Signup.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /signup:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});



// GET: All signup documents
App.get("/signup/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const docs = await Signup.find({ email });
    res.json(docs);
  } catch (error) {
    console.error("Error in /signup:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// update: update a admin by email
// App.post("/updateprofile/:email", async (req, res) => {
//   try {
//     const email = req.params.email

//     const updateemail = req.body.updateemail;
//     const updatename = req.body.updatename;
//     const updatephone = req.body.updatephone;
//     const updategender = req.body.updategender;
    

//     Signup.findOneAndUpdate({ email },
//       { email: updateemail, name: updatename, phone: updatephone, Gender: updategender }, { new: true })
//       .then(result => {
//         res.status(200).json(result);
//         console.log("the updated result :", result);
//       })
//   }
//   catch (error) {
//     console.error("Error in /updatedisease/:adminemail", error);
//     res.status(500).json({ error: "An error occurred" });
//   };
// });




///////////////////////////////////Admin penal end ////////////////////////////////////////////////////////



App.post("/department", async(req,res)=>{
  try {
    const department = new Department({
      sno: req.body.sno,
      department: req.body.department,
    });
    const doc = await department.save();
    res.json(doc);
  } catch (error) {
    console.error("Error in /department:", error);
    res.status(500).json({ error: "An error occurred" });
  }

})



App.get("/department" , async(req,res) =>{
  try {
    const docs = await Department.find({})
    res.json(docs);
  } catch (error) {
    // console.log(error,"error to fetch department");
    res.status(500).json({ error: "An error occurred" });
  }
})

App.delete("/Deletedep/:sno", async (req, res) => {
  try {
    const sno = req.params.sno;
    const result = await Department.deleteOne({ sno });
    res.json(result);
  } catch (error) {
    console.error("Error in /Department:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

App.post("/medicine", async(req,res)=>{
  try {
    const medicine = new Medicine({
      quantity:req.body.quantity,
      name: req.body.name,
    });
    const doc = await medicine.save();
    res.json(doc);
  } catch (error) {
    console.error("Error in /department:", error);
    res.status(500).json({ error: "An error occurred" });
  }

})

App.get("/medicine" , async(req,res) =>{
  try {
    const docs = await Medicine.find({})
    res.json(docs);
  } catch (error) {
    // console.log(error,"error to fetch department");
    res.status(500).json({ error: "An error occurred" });
  }
})


//////////////////////////Patient penal start//////////////////////////////////////////////////////////////


// insert image and get them
const  storage = multer.diskStorage({
  destination: function (re,file,cb){
    cb(null,"../src/images")
  },
  filename: function (req, file, cb){
    const fileName = path.basename(file.originalname)
    cb(null,fileName )
  }
});

const upload = multer({
  storage,
})


// POST: User login
App.post("/patientlogin", async (req, res) => {
  const { patientemail, patientpassward } = req.body;
  const patient = await Patient.findOne({ patientemail });
  if (!patient) {
    return res.json({ error: "patient not found" })
  }
  if (patientpassward == patient.patientpassward) {
    const token = jwt.sign({ patientemail: patient.patientemail }, jwt_secretkey);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error in login" })
    }

  }
  res.json({ status: "successsssssss" })
  console.log("patient login data", data)
});



App.post("/patientdata", upload.array("photoimage",[1]),async (req, res) => {
  const { token } = req.body;
  try {
    const patientdata = jwt.verify(token, jwt_secretkey);
    const patientttemail = patientdata.patientemail;
    Patient.findOne({ patientemail: patientttemail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error in show", data: error });
      });
  } catch (error) { error, "errrrrrrrrrrrrrrrror" }
})

// POST: patient signup 
App.post("/patientsignup", async (req, res) => {
  const { patientname, patientemail, patientpassward, age,doctor, medicine,phone, Gender, disease, Address , images } = req.body;
  
  console.log("data added for signup " , images)
  try {
    const oldpatientuser = await Patient.findOne({ patientemail });

    if (oldpatientuser) {
      return res.json({ error: "user existed" });
    }
    const data = await Patient.create({
      patientname,
      patientemail,
      patientpassward,
      images,
      medicine,
      phone,
      doctor,
      Gender,
      age,
      disease,
      Address
    })
    res.send({ status: "ok" })
    console.log( "status ok here data", data )
  } catch (error) {
    res.send({ status: "error in signupppp" })
  }
});


// GET: All Patients documents
App.get("/AddPatient", async (req, res) => {
  try {
    const docs = await Patient.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddPatient:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

App.get("/patient", async (req, res) => {
  try {
    const docs = await Patient.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddPatient:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

App.get("/patient/:patientemail", async (req, res) => {
  try {
    const patientemail = req.params.patientemail;
    const docs = await Patient.find({ patientemail });
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddPatient:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE: Delete an patient (this is a very basic example, not recommended for production)
App.delete("/DeletePatient/:patientemail", async (req, res) => {
  try {
    const patientemail = req.params.patientemail;
    const result = await Patient.deleteOne({ patientemail });
    res.json(result);
  } catch (error) {
    console.error("Error in /DeletePatient:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// update: update a doctor by email
App.post("/updatePatient/:patientemail", async (req, res) => {
  try {
    const patientemail = req.params.patientemail;
    const updateemail = req.body.updateemail;
    const updatename = req.body.updatename;
    const updatephone = req.body.updatephone;
    const updateage = req.body.updateage;
    const updatedoctor = req.body.updatedoctor;
    const updateaddress = req.body.updateaddress;
    const updategender = req.body.updategender;
    
    const updatedisease = req.body.updatedisease;

    Patient.findOneAndUpdate({ patientemail },
      { patientemail: updateemail, patientname: updatename, phone: updatephone, age: updateage, Address: updateaddress, Gender: updategender, disease: updatedisease ,doctor:updatedoctor}, { new: true })
      .then(result => {
        res.status(200).json(result);
        console.log("the updated result :", result);
      })
  }
  catch (error) {
    console.error("Error in /updatedisease/:patientemail", error);
    res.status(500).json({ error: "An error occurred" });
  };
});


//////////////////////////////Patient penal ends////////////////////////////////////////////////////////////



////////////////////Doctor penal start//////////////////////////////////////////////////////////////////////
// POST: Doctor login
App.post("/doctorlogin", async (req, res) => {
  const { email, passward } = req.body;
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    return res.json({ error: "doctor not found" })
  }
  if (passward == doctor.passward) {
    const token = jwt.sign({ email: doctor.email }, jwt_secretkey);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" })
    }
  }
  res.json({ status: "success" })

});


App.post("/doctordata", async (req, res) => {
  const { token } = req.body;
  try {
    const doctordata = jwt.verify(token, jwt_secretkey);
    const doctoremail = doctordata.email;
    Doctor.findOne({ email: doctoremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error ", data: error });
      });
  } catch (error) { }
})

// POST: doctor signup
App.post("/doctorsignup", async (req, res) => {
  const { name, email, passward, phone, Gender, special,
    age,
    Address,
    experienced } = req.body;
  try {
    const olduser = await Doctor.findOne({ email });
    if (olduser) {
      return res.json({ error: "user existed" });
    }
    await Doctor.create({
      name,
      email,
      passward,
      phone,
      Gender,
      special,
      age,
      Address,
      experienced
    })
    res.send({ status: "ok" })
  } catch (error) {
    res.send({ status: "error" })
  }
});


// POST: Add a doctor
// App.post("/AddDoctor", async (req, res) => {

//   try {
//     const doctor = new Doctor({
//       name: req.body.name,
//       email: req.body.email,
//       passward: req.body.passward,
//       special: req.body.special,
//       phone: req.body.phone,
//       Address: req.body.Address,
//       Gender: req.body.Gender,
//       experienced: req.body.experienced
//     });
//     const doc = await doctor.save();
//     res.send({ status: "ok" })
//     res.json(doc);
//   } catch (error) {
//     console.error("Error in /AddDoctor:", error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });



// GET: All doctor documents
App.get("/getdoctor", async (req, res) => {
  try {
    const docs = await Doctor.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddDoctor:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


App.get("/doctor", async (req, res) => {
  try {
    const docs = await Doctor.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddDoctor:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


App.get("/doctor/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const docs = await Doctor.find({ email });
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddDoctor:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});



App.get("/getdoctor/:email", async (req, res) => {
  try {
    const docs = await Doctor.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddDoctor:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});



// DELETE: Delete a doctor by email
App.delete("/Deletedoctor/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Doctor.deleteOne({ email });
    res.json(result);
  } catch (error) {
    console.error("Error in /Deletedoctor/:email", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// update: update a doctor by email
App.post("/updatedoctor/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updateemail = req.body.updateemail;
    const updatename = req.body.updatename;
    const updatephone = req.body.updatephone;
    const updatespeciality = req.body.updatespeciality;
    const updateaddress = req.body.updateaddress;
    const updategender = req.body.updategender;
    const updateexperienced = req.body.updateexperienced;
    Doctor.findOneAndUpdate({ email },
      { email: updateemail, name: updatename, phone: updatephone, special: updatespeciality, Address: updateaddress, Gender: updategender, experienced: updateexperienced }, { new: true })
      .then(result => {
        res.status(200).json(result);
        console.log("the updated result :", result);
      })
  }
  catch (error) {
    console.error("Error in /updatedoctor/:email", error);
    res.status(500).json({ error: "An error occurred" });
  };
});



///////////////////////////////////////////Doctor penal ends//////////////////////////////////////////////////




//////////////////////Receptionist penal start//////////////////////////////////////////////////////////////
// POST: receptionist login
App.post("/reslogin", async (req, res) => {
  const { email, passward } = req.body;
  const ress = await Recaptionist.findOne({ email });
  if (!ress) {
    return res.json({ error: "patient not found" })
  }
  if (passward == ress.passward) {
    const token = jwt.sign({ email: ress.email }, jwt_secretkey);
    if (res.status(201)) {
      return res.send({ status: "ok", data: token });
    } else {
      return res.json({ error: "error in login" })
    }

  }
  res.json({ status: "successsssssss" })
  // console.log("res login data" , data)
});

App.post("/resdata", async (req, res) => {
  const { token } = req.body;
  try {
    const resdata = jwt.verify(token, jwt_secretkey);
    const email = resdata.email;
    Recaptionist.findOne({ email: email })
      .then((data) => {
        res.json({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error in show", data: error });
      });
  } catch (error) { error, "errrrrrrrrrrrrrrrror" }
})


// POST: Recaptionist signup
App.post("/ressignup", async (req, res) => {

  const { name, email, passward, age, phone, Gender, salary , department } = req.body;
  try {
    const olduser = await Recaptionist.findOne({ email });

    if (olduser) {
      return res.json({ error: "user existed" });
    }
    await Recaptionist.create({
      name,
      email,
      passward,
      phone,
      Gender,
      age,
      salary,
      department
    })
    res.json({ status: "ok" })
  } catch (error) {
    res.json({ status: "error in signupppp" })
  }
});



// GET: All recaptionist documents
App.get("/getrecaptionist", async (req, res) => {
  try {
    const docs = await Recaptionist.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /getrecaptionist:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET: All recaptionist documents
App.get("/recaptionist", async (req, res) => {
  try {
    const docs = await Recaptionist.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /getrecaptionist:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

App.get("/recaptionist/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const docs = await Recaptionist.find({ email });
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddDoctor:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});



App.get("/recaptionist/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const docs = await Accountant.find({ email });
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddDoctor:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE: Delete a recaptionist by email
App.delete("/deleterecaptionist/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Recaptionist.deleteOne({ email });
    res.json(result);
  } catch (error) {
    console.error("Error in /deleterecaptionist/:email", error);
    res.status(500).json({ error: "An error occurred" });
  }
});



// update: update a doctor by email
App.post("/updateRecaptionist/:email", async (req, res) => {
  try {
    const email = req.params.email
    const updateemail = req.body.updateemail;
    const updatename = req.body.updatename;
    const updateage = req.body.updateage;
    const updatephone = req.body.updatephone;
    const updatesalary = req.body.updatesalary;
    const updatedepartment = req.body.updatedepartment;

    Recaptionist.findOneAndUpdate({ email },
      { email: updateemail, name: updatename, phone: updatephone, age: updateage, salary: updatesalary, department: updatedepartment }, { new: true })
      .then(result => {
        res.status(200).json(result);
        console.log("the updated result :", result);
      })
  }
  catch (error) {
    console.error("Error in /updaterecaptionist/:email", error);
    res.status(500).json({ error: "An error occurred" });
  };
});



/////////////////////////////receptionist penal ends //////////////////////////////////////////////////////


//////////////////////   Employee penal start /////////////////////////////////////////////////////////////////

// POST: Add an employee
App.post("/AddEmployee", async (req, res) => {
  try {
    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      phone: req.body.phone,
      position: req.body.position,
      Address: req.body.Address,
      Gender: req.body.Gender,
    });
    const doc = await employee.save();
    res.json(doc);
  } catch (error) {
    console.error("Error in /AddEmployee:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET: All employee documents
App.get("/AddEmployee/:email", async (req, res) => {
  try {
    const docs = await Employee.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddEmployee:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// GET: All employee documents
App.get("/employee", async (req, res) => {
  try {
    const docs = await Employee.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddEmployee:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

App.get("/employee/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const docs = await Employee.find({ email });
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddDoctor:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// DELETE: Delete an employee (this is a very basic example, not recommended for production)
App.delete("/DeleteEmployee/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Employee.deleteOne({ email });
    res.json(result);
  } catch (error) {
    console.error("Error in /DeleteEmployee:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// update: update a doctor by email
App.post("/updateEmployee/:email", async (req, res) => {
  try {
    const email = req.params.email
    const updateemail = req.body.updateemail;
    const updatename = req.body.updatename;
    const updatephone = req.body.updatephone;
    const updateage = req.body.updateage;
    const updateaddress = req.body.updateaddress;
    const updategender = req.body.updategender;
    const updateposition = req.body.updateposition;

    Employee.findOneAndUpdate({ email },
      { email: updateemail, name: updatename, phone: updatephone, age: updateage, Address: updateaddress, Gender: updategender, position: updateposition }, { new: true })
      .then(result => {
        res.status(200).json(result);
        console.log("the updated result :", result);
      })
  }
  catch (error) {
    console.error("Error in /updateEmployee/:email", error);
    res.status(500).json({ error: "An error occurred" });
  };
});

/////////////////////   Employee penal ends ///////////////////////////////////////////////////////////////////



//////////  Accountant penal start////////////////////////////////////////////////////////////////////////////////

// POST: Add a Accountant
App.post("/addAccountant", async (req, res) => {
  try {
    const accountant = new Accountant({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      phone: req.body.phone,
      salary: req.body.salary,
      department: req.body.department,

    });
    const doc = await accountant.save();
    res.json(doc);
  } catch (error) {
    console.error("Error in /addaccountant:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET: All accountant documents
App.get("/getaccountant", async (req, res) => {
  try {
    const docs = await Accountant.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /getAccountant:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// GET: All accountant documents
App.get("/accountant", async (req, res) => {
  try {
    const docs = await Accountant.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /getAccountant:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// DELETE: Delete a Accountant by email
App.delete("/deleteAccountant/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Accountant.deleteOne({ email });
    res.json(result);
  } catch (error) {
    console.error("Error in /deleterecaptionist/:email", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// update: update a doctor by email
App.post("/updateAccountact/:email", async (req, res) => {
  try {
    const email = req.params.email
    const updateemail = req.body.updateemail;
    const updatename = req.body.updatename;
    const updateage = req.body.updateage;
    const updatephone = req.body.updatephone;

    const updatesalary = req.body.updatesalary;
    const updatedepartment = req.body.updatedepartment;

    Accountant.findOneAndUpdate({ email },
      { email: updateemail, name: updatename, phone: updatephone, age: updateage, updatesalary: updatesalary, department: updatedepartment }, { new: true })
      .then(result => {
        res.status(200).json(result);
        console.log("the updated result :", result);
      })
  }
  catch (error) {
    console.error("Error in /updateAccountant/:email", error);
    res.status(500).json({ error: "An error occurred" });
  };
});



/////////////////////////Accountant penal ends /////////////////////////////////////////////////////////

///////////////////////  Lab penal start//////////////////////////////////////////////////////////////
// POST: Add a Lab
App.post("/addlab", async (req, res) => {
  try {
    const accountant = new Lab({
      name: req.body.name,
      email: req.body.email,
      Honour: req.body.Honour,
      phone: req.body.phone,
      department: req.body.department,

    });
    const doc = await accountant.save();
    res.json(doc);
  } catch (error) {
    console.error("Error in /addaccountant:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// GET: All lab documents
App.get("/getlab", async (req, res) => {
  try {
    const docs = await Lab.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /getlab:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// GET: All lab documents
App.get("/lab", async (req, res) => {
  try {
    const docs = await Lab.find({});
    res.json(docs);
  } catch (error) {
    console.error("Error in /getlab:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


App.get("/lab/:department", async (req, res) => {
  try {
    const department = req.params.department;
    const docs = await Lab.find({ department });
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddDoctor:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


App.get("/lab/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const docs = await Lab.find({ email });
    res.json(docs);
  } catch (error) {
    console.error("Error in /AddDoctor:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});



// DELETE: Delete a lab by email
App.delete("/deletelab/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Lab.deleteOne({ email });
    res.json(result);
  } catch (error) {
    console.error("Error in /deletelab/:email", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// update: update a doctor by email
App.post("/updateLab/:email", async (req, res) => {
  try {
    const email = req.params.email
    const updateemail = req.body.updateemail;
    const updatename = req.body.updatename;
    const updatephone = req.body.updatephone;
    const updateHonour = req.body.updateHonour
    const updatedepartment = req.body.updatedepartment;

    Lab.findOneAndUpdate({ email },
      { email: updateemail, name: updatename, phone: updatephone, Honour: updateHonour, department: updatedepartment }, { new: true })
      .then(result => {
        res.status(200).json(result);
        console.log("the updated result :", result);
      })
  }
  catch (error) {
    console.error("Error in /updateLab/:email", error);
    res.status(500).json({ error: "An error occurred" });
  };
});
///////////////////////  Lab penal ends //////////////////////////////////////////////////////////////////
