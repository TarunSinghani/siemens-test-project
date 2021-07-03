import React, { Component } from "react";
import DashboardDelete from "./DashboardDelete";
import AddPopup from "./AddPopup";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import EditPopup from "./EditPopup";
export default class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state={
            userData:[],
            deletedUserdata:[],
            filteredUserdata:[],
            isAddOpen:false,
            isEditOpen:false,
            currentEditEmp:{}
        }

        this.updatedUserData=[];
        this.deletedUserDataList=[];
        this.filterDataList=[];
        this.name="";
        this.address="";
        this.company="";
    }

    componentDidMount(){

        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res=>res.json())
        .then((result)=>{
            this.updatedUserData=result;
            this.updatedUserData.forEach((user,index)=>{
                user.address=user.address.street+user.address.suite+","+user.address.city+","+user.address.zipcode;
                user.company=user.company.name;
            })
            this.setState({userData:this.updatedUserData});
        })
        .catch((error)=>{
            alert("Network Error: "+error);
        })

    }

    deleteUser=(user)=>{
        //alert(user.id);
        this.updatedUserData.forEach((listuser,index)=>{
            if(listuser.id===user.id){
                this.updatedUserData.splice(index,1);
            }
        })
        this.deletedUserDataList.push(user);
        this.setState({userData:this.updatedUserData,deletedUserdata:this.deletedUserDataList});

        
    }

    restoreUser=(user)=>{
        this.updatedUserData.push(user);

        this.deletedUserDataList.forEach((listuser,index)=>{
            if(listuser.id===user.id){
                this.deletedUserDataList.splice(index,1);
            }
        });

        this.setState({userData:this.updatedUserData,deletedUserdata:this.deletedUserDataList});
    }

    openPopup=()=>{
        this.setState((prev)=>{
            return {isAddOpen:!prev.isAddOpen}
        });
    }

    openEditPopup=(user)=>{

        this.setState((prev)=>{
            return {
                isEditOpen:!prev.isEditOpen,
                currentEditEmp:user
                }
        });       
    }

    addNewUser=(user)=>{

        this.updatedUserData.push(user);
        this.setState({userData:this.updatedUserData,isAddOpen:false});
        alert("New User Added: Please check the Employee List Table");
    }

    updateEditUser=(user)=>{

        let ind=0;
        this.updatedUserData.forEach((listuser,index)=>{
            if(listuser.id===user.id){
                ind=index;
            }
        });
        this.updatedUserData[ind]=user;
        this.setState({userData:this.updatedUserData,isEditOpen:false});
        alert("User Updated: Please check the Employee List Table");
    }

    //filterbyname, filterbycompany, filterbyadd methods contains the logic of individual and combine filters as a combination
    filterbyname=(event,values)=>{
        let flag=[];
        if(values!==null){
            if(this.filterDataList.length>0){
                this.filterDataList.forEach((user,index)=>{
                    if(user.name===values.name){
                        this.name=user.name;
                        flag.push(user);
                    }
                })
                this.filterDataList=[];
                flag.forEach((user,index)=>{
                    this.filterDataList.push(user);
                })
            }
            else{
                this.state.userData.forEach((user,index)=>{
                    if(user.name===values.name){
                        this.filterDataList.push(user);
                        this.name=user.name;
                    }
                })
            }            
        }
        else{
            this.filterDataList=[];
            this.name="";
            if(this.company!==""){
                this.filterbycompany(event,{company:this.company});
            }
            if(this.address!==""){
                this.filterbyadd(event,{address:this.address});
            }            
        }
        this.setState({filteredUserdata:this.filterDataList});
    }

    filterbycompany=(event,values)=>{

        let flag=[];
        if(values!==null){
            if(this.filterDataList.length>0){
                this.filterDataList.forEach((user,index)=>{
                    if(user.company===values.company){
                        this.company=user.company;
                        flag.push(user);
                    }
                })
                this.filterDataList=[];
                flag.forEach((user,index)=>{
                    this.filterDataList.push(user);
                })
            }
            else{
                this.state.userData.forEach((user,index)=>{
                    if(user.company===values.company){
                        this.filterDataList.push(user);
                        this.company=user.company;
                    }
                })
            }            
        }
        else{
            this.filterDataList=[];
            this.company="";
            if(this.name!==""){
                this.filterbyname(event,{name:this.name});
            }
            if(this.address!==""){
                this.filterbyadd(event,{address:this.address});
            }
        }
        this.setState({filteredUserdata:this.filterDataList});
    }

    filterbyadd=(event,values)=>{

        let flag=[];
        if(values!==null){
            if(this.filterDataList.length>0){
                this.filterDataList.forEach((user,index)=>{
                    if(user.address===values.address){
                        this.address=user.address;
                        flag.push(user);
                    }
                })
                this.filterDataList=[];
                flag.forEach((user,index)=>{
                    this.filterDataList.push(user);
                })
            }
            else{
                this.state.userData.forEach((user,index)=>{
                    if(user.address===values.address){
                        this.filterDataList.push(user);
                        this.address=user.address;
                    }
                })
            }            
        }
        else{
            this.filterDataList=[];
            this.address="";
            if(this.name!==""){
                this.filterbyname(event,{name:this.name});
            }
            if(this.company!==""){
                this.filterbycompany(event,{company:this.company});
            }            
        }
        this.setState({filteredUserdata:this.filterDataList});
    }


    render(){
        return(
            <div>
                
                <div className="container">
                    <hr style={{backgroundColor:"grey"}}></hr>
                    <h6>Home Dashboard</h6>
                    <hr style={{backgroundColor:"grey"}}></hr>
                    <br></br>
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <h3 style={{textAlign:"center"}}>Employee List</h3>
                        </div>
                        <div className="col-md-2 m-auto text-right">
                            <button className="btn btn-primary" onClick={()=>{this.openPopup()}}>Add</button>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-md-3 text-center">
                            Search By Name:
                            <Autocomplete id="name-combo" options={this.state.userData} getOptionLabel={(option) => option.name} onChange={this.filterbyname} renderInput={(params) => <TextField {...params}  variant="outlined" />} />
                        </div>
                        <div className="col-md-3 text-center">
                            Search by Address:
                            <Autocomplete id="address-combo" options={this.state.userData} getOptionLabel={(option) => option.address} onChange={this.filterbyadd} renderInput={(params) => <TextField {...params}  variant="outlined" />} />
                        </div>
                        <div className="col-md-3 text-center">
                            Search by Company:
                            <Autocomplete id="company-combo" options={this.state.userData} getOptionLabel={(option) => option.company} onChange={this.filterbycompany} renderInput={(params) => <TextField {...params}  variant="outlined" />} />
                        </div>

                    </div>
                    <br></br>
                    <div className="row">
                        <div style={{height:"200px",width:"100%",overflow:"auto"}}>
                            <table className="table table-striped table-bordered table-sm">
                                <thead style={{backgroundColor:"lightcyan",textAlign:"center"}}>
                                    <tr>
                                        <th className="tablecell">Name</th>
                                        <th className="tablecell">Address</th>
                                        <th className="tablecell">Company</th>
                                        <th className="tablecell">Actions</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {(this.name!==""||this.address!==""||this.company!=="")?this.state.filteredUserdata.map((user,index)=>{
                                        return (
                                            <tr>
                                                <td className="tablecell">{user.name}</td>
                                                <td className="tablecell">{user.address}</td>
                                                <td className="tablecell">{user.company}</td>
                                                <td>
                                                    <span>
                                                        <button className="btn btn-primary" onClick={()=>{this.openEditPopup(user)}}>Edit</button>
                                                    </span>
                                                    <span className="spanstyle">
                                                    <button className="btn btn-primary" onClick={()=>{this.deleteUser(user)}}>Delete</button>
                                                    </span>                                                   
                                                </td>
                                            </tr>
                                        )

                                    })
                                    :this.state.userData.map((user,index)=>{
                                        return(
                                            <tr>
                                                <td className="tablecell">{user.name}</td>
                                                <td className="tablecell">{user.address}</td>
                                                <td className="tablecell">{user.company}</td>
                                                <td>
                                                    <span>
                                                        <button className="btn btn-primary" onClick={()=>{this.openEditPopup(user)}}>Edit</button>
                                                    </span>
                                                    <span className="spanstyle">
                                                    <button className="btn btn-primary" onClick={()=>{this.deleteUser(user)}}>Delete</button>
                                                    </span>                                                   
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                    
                                </tbody>

                            </table>
                        </div>
                        
                    </div>
                    <br></br>

                                    
                    <DashboardDelete deletedUser={this.state.deletedUserdata} restoreUser={this.restoreUser}></DashboardDelete>

                    {this.state.isAddOpen?<AddPopup handleClose={this.openPopup} size={this.updatedUserData.length} addNewUser={this.addNewUser} />:<div></div>}

                    {this.state.isEditOpen?<EditPopup handleClose={this.openEditPopup} currentUser={this.state.currentEditEmp} updateEditUser={this.updateEditUser} />:<div></div>}
                    
                
                </div>
            </div>
            
        )
    }
}