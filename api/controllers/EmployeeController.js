/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    addEmployeeDetails336: function(req,res){
           //res.ok();
           console.log("in addEmployeeDetails336 controller");
           let id = req.query.employeeID;
           let name = req.query.employeeName;
           let email = req.query.employeeEmail;
           let project = req.query.employeeProject;
           let role = req.query.employeeRole;
           console.log("in addEmployeeDetails336 controller",Number(id));
           Employee.create({id: Number(id),employeeName: name, employeeEmail: email}).exec( function (err){
               if(err){
                console.log("error",err );   
               }
               console.log("inserted employee details",name);
               ProjectDetails.create({id: Number(id), projectName: project, role: role, owner:Number(id)}).exec(function (err){
                   if(err){
                    console.log("error",err ); 
                   }
                    console.log("inserted project details",project);
                    res.ok();
                } );
           });
    },

    removeProjectDetails336: function(req,res){
        console.log("in removeProjectDetails336 controller");
        let id = req.query.employeeID;
        let projName = req.query.employeeProj;
        let role = req.query.employeeRole;
        ProjectDetails.destroy({id: Number(id), projectName:projName, role: role}).exec( function(err){
            res.ok();
        });
    },

    removeEmployeeDetails336: function(req,res){
        console.log("in removeEmployeeDetails336 controller");
        let id = req.query.employeeID;
        Employee.destroy({id: Number(id)}).exec( function(err){
            res.ok();
        });
    },

   searchEmployee336: function(req,res){
    console.log("in searchEmployee336 controller");
    let id = req.query.employeeID;
    let fullDetails = {};
    let projectArray = [];
    
    Employee.find({id: Number(id)}).exec( function(err, details){
        if(details.length <= 0){
          res.json({result : false});
        }
        console.log("fetched details: ",details);
        console.log(details[0].employeeID);
        fullDetails.employeeID = details[0].id;
        fullDetails.employeeName = details[0].employeeName;
        fullDetails.employeeEmail = details[0].employeeEmail;
        ProjectDetails.find({id: Number(id)}).exec( function(err, projectDetails){
            console.log("fetched projects: ",projectDetails.length);
            for(project of projectDetails){
                let temp = {};
                temp.projectName = project.projectName;
                temp.role = project.role;
                projectArray.push(temp);
            }
            fullDetails.projects = projectArray;
            fullDetails.result = true;
            res.json(fullDetails);
        });
    });
  

},
    searchEmployeeProject336: function(req,res){
        let param = req.query.searchParam;
        let employeeArray = [];
        ProjectDetails.find({role: {contains : param} }).exec( function(err, projectDetails){
            if(err){
                res.json(err);
            }
            for(employee of projectDetails){
                let projectResult = {};
                projectResult.employeeID = employee.id;
                projectResult.employeeProject = employee.projectName;
                projectResult.employeeRole = employee.role;
                employeeArray.push(projectResult);
            }
            
            res.json(employeeArray);
        });
    },

        fetchEmployeeByProject336: function(req,res){
            let param = req.query.searchParam;
            let projectArray = [];
            
            ProjectDetails.find({projectName: param}).exec( function(err, projectDetails){
                if(!err){
                    console.log(projectDetails);
                    console.log('length',projectDetails.length);
                    for(project of projectDetails){
                        let fullDetails = {};
                        console.log("in loop",project);
                        fullDetails.employeeID = project.employeeID;
                        fullDetails.employeeProject = project.projectName;
                        fullDetails.employeeRole = project.role;

                        Employee.find({employeeID: project.employeeID}).exec(function(err2, details){
                            if(!err2){
                             fullDetails.employeeName = details[0].employeeName;
                             fullDetails.employeeEmail = details[0].employeeEmail; 
                            }
                            else{
                                console.log("hello");
                            }
                    });
                    projectArray.push(fullDetails);
                    
                    }
                    res.json(projectArray);
                    //res.ok();
                }
                else{
                    res.json(err);
                }
                
            });
            
            
        },

    



};

