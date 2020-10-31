const bcrypt = require("bcrypt");
const express = require("express");
const {User} = require("../models/userModel");
const {Comments} = require("../models/commentsModel");
const {Project} = require("../models/projectModel");
const {Issues} = require("../models/issuesModel");
const config = require("config");
const router = express.Router();


router.get('/',(req,res)=>{
  res.send("<h1>Wel Come to App its working fine on heroku</h1>")
})

router.post("/users", async (req, res) => {
  
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    key: req.body.key,
    email: req.body.email,
    userType:req.body.userType
  });

  user.key = await bcrypt.hash(user.key, 10);

  await user.save();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    message:"User created Success"
  });
});

router.get('/users',async (req,res)=>{
   const userslist = await User.find(); 

   if(userslist.length > 0){
      res.status(200).json({
        usersList: userslist
      });
   } 
   else {
    res.status(400).json({
      message: "No user found in MongoDB"
    });
   }
});

router.get('/users/:email',async (req,res)=>{
  const {email} = req.params
  console.log("req.params.email",email);

  const user = await User.findOne({email});

  if(user){
    res.status(200).json({
      userdata: user
    });
  }else{
    res.status(400).json({
      message: "User not found in MongoDB agint this email ="+email
    });
  }

});


router.post("/projects", async (req, res) => {
  
  let project = await Project.findOne({ slug: req.body.slug });
  if (project) return res.status(400).send("Project already registered");

  project = new Project({
    name: req.body.name,
    slug: req.body.slug.toUpperCase(),
    description: req.body.description,
  });


  await project.save();

  res.status(200).json({
    _id: project._id,
    name: project.name,
    slug: project.slug,
    message:"Project created Success"
  });
});

router.get('/projects',async (req,res)=>{
   const projectsList = await Project.find(); 

   if(projectsList.length > 0){
      res.status(200).json({
        projectsList: projectsList
      });
   } 
   else {
    res.status(400).json({
      message: "No Project found in MongoDB"
    });
   }
});

router.get('/projects/:slug',async (req,res)=>{
  const {slug} = req.params
  console.log("req.params.slug",slug);

  const project = await Project.findOne({slug});

  if(project){
    res.status(200).json({
      projectData: project
    });
  }else{
    res.status(400).json({
      message: "Project not found in MongoDB agint this slug = "+slug
    });
  }

});

router.post('/projects/:slug/issues',async (req,res)=>{
  const {slug} = req.params
  console.log("req.params.slug",slug);

  const project = await Project.findOne({slug});
  const issues = await Issues.find({project_id:project._id});

  if(project){
    
    const issueNumber = slug+"-"+(issues.length+1);
    console.log(issueNumber);
    const issue = new Issues({
      issuesNumber:issueNumber,
      title:req.body.title,
      description:req.body.description,
      status:"open",
      project_id:project._id
    });
    
    await Issues.create(issue);

    res.status(200).json({
      _id: issue._id,
      naissuesNumberme: issue.issuesNumber,
      title: issue.title,
      message:"Issue created Success"
    });
    
  }else{
    res.status(400).json({
      message: "Project not found in MongoDB agint this slug = "+slug+" can not add issue"
    });
  }

});



router.post('/issues/:issuesNumber/comments',async (req,res)=>{
  const {issuesNumber} = req.params
  console.log("req.params.issuesNumber",issuesNumber);

  const issue = await Issues.findOne({issuesNumber});
  const user = await User.findOne({email:req.body.author}); 

  if(issue && user){

   const comment = new Comments({
      text:req.body.text,
      author:user._id
   })

    await Comments.create(comment);

    console.log("issue",issue)

    issue.comments.push(comment._id);

    await issue.save();

    res.status(200).json({
      _id: comment._id,
      text: comment.text,
      message:"Comment created Success"
    });
    
  }else{
    res.status(400).json({
      message: "Issue or User not found in MongoDB so can not add comment"
    });
  }

});

router.get('/comments',async (req,res) => {
  const commentslist = await Comments.find().populate('author');

  if(commentslist.length){
    res.status(200).json({
      commentsList: commentslist
    });
  }else{
    res.status(400).json({
      message: "Comments not found.."
    });
  }

});

router.get('/comments/:email',async (req,res) => {
 
  const {email} = req.params
  console.log("req.params.email",email);
  const user = await User.findOne({email}); 

  if(user){
    const commentslist = await Comments.find({author:user._id}).populate('author');
    res.status(200).json({
      commentsList: commentslist
    });
  }else{
    res.status(400).json({
      message: "Comments not found.."
    });
  }
});

router.get('/issuese/:issuesNumber/comments', async (req,res)=>{
  const {issuesNumber} = req.params
  console.log("req.params.issuesNumber",issuesNumber);

  const issue = await Issues.findOne({issuesNumber}).populate('comments');
  if(issue){
 
     res.status(200).json({
      commentsList:issue.comments
     });
     
   }else{
     res.status(400).json({
       message: "Issue not found in MongoDB so can not get comment"
     });
   } 
});

router.get('/issuese/:issuesNumber/comments/:commentid', async (req,res)=>{
  const {issuesNumber,commentid} = req.params
  console.log("req.params.issuesNumber",issuesNumber,"req.params.commentid",commentid);

  const issue = await Issues.findOne({issuesNumber}).populate('comments');
  if(issue){
      console.log(Number(commentid) >= issue.comments.length);
     if(Number(commentid)-1 < issue.comments.length ){
      res.status(200).json({
        commentsList:issue.comments[Number(commentid)-1]
       });
     }else{
      res.status(400).json({
        message: "Comments not found in MongoDB against commentid ="+commentid
      });
     }  
   }else{
     res.status(400).json({
       message: "Issue not found in MongoDB so can not get comment"
     });
   } 
});

router.get('/issues',async (req,res)=>{

  const issueslist = await Issues.find().populate('comments');
  if(issueslist.length>0){
 
     res.status(200).json({
      issuesList:issueslist
     });
     
   }else{
     res.status(400).json({
       message: "Issue not found in MongoDB "
     });
   }
});

router.get('/issuese/:issuesNumber', async (req,res)=>{
  const {issuesNumber} = req.params
  console.log("req.params.issuesNumber",issuesNumber);

  const issue = await Issues.findOne({issuesNumber}).populate('comments');
  if(issue){
 
     res.status(200).json({
      issueData:issue
     });
     
   }else{
     res.status(400).json({
       message: "Issue not found in MongoDB "
     });
   } 
});


router.get('/projects/:slug/issues',async (req,res)=>{
  const {slug} = req.params
  console.log("req.params.slug",slug);

  const project = await Project.findOne({slug});
  const issuesList = await Issues.find({project_id:project._id}).populate('comments');

  if(project && issuesList.length>0){
    res.status(200).json({
      issuesList:issuesList
    })
  }else{
    res.status(400).json({
      message: "Project not found in MongoDB so can not get issue"
    });
  }

});

router.put('/projects/:slug/issues/:issuesNumber/:statusparm', async (req,res)=>{
  const {issuesNumber,statusparm,slug} = req.params

  if(slug !== issuesNumber.substring(0,issuesNumber.length-2)){
    res.status(400).json({
      message: "Issue not related to Project "
    });
  }

  console.log("req.params.issuesNumber",issuesNumber);

  const issue = await Issues.findOne({issuesNumber});
  if(issue){

    issue.status=statusparm;
    await issue.save();
    res.status(200).json({
      message:"Status update success"
     });
     
   }else{
     res.status(400).json({
       message: "Issue not found in MongoDB "
     });
   } 
})


module.exports = router;