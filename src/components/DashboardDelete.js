import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class DashboardDelete extends Component{
    constructor(props){
        super(props);

        this.state={
            filteredUserdata:[],
        }

        this.filterDataList=[];
        this.name="";
        this.address="";
        this.company="";
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
                this.props.deletedUser.forEach((user,index)=>{
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
                this.props.deletedUser.forEach((user,index)=>{
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
                this.props.deletedUser.forEach((user,index)=>{
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
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h3 style={{textAlign:"center"}}>Deleted Employee List</h3>
                    </div>
                    <div className="col-md-2 m-auto">

                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-md-3 text-center">
                        Search By Name:
                        <Autocomplete id="name-combo2" options={this.props.deletedUser} getOptionLabel={(option) => option.name} onChange={this.filterbyname} renderInput={(params) => <TextField {...params}  variant="outlined" />} />
                    </div>
                    <div className="col-md-3 text-center">
                        Search by Address:
                        <Autocomplete id="address-combo2" options={this.props.deletedUser} getOptionLabel={(option) => option.address} onChange={this.filterbyadd} renderInput={(params) => <TextField {...params}  variant="outlined" />} />
                    </div>
                    <div className="col-md-3 text-center">
                        Search by Company:
                        <Autocomplete id="company-combo2" options={this.props.deletedUser} getOptionLabel={(option) => option.company} onChange={this.filterbycompany} renderInput={(params) => <TextField {...params}  variant="outlined" />} />
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
                                                <td className="tablecell">
                                                    <button className="btn btn-primary" onClick={()=>{this.props.restoreUser(user)}}>Restore</button>                                                 
                                                </td>
                                            </tr>
                                        )

                                    })
                                :this.props.deletedUser.map((user,index)=>{
                                    return(
                                        <tr>
                                            <td className="tablecell">{user.name}</td>
                                            <td className="tablecell">{user.address}</td>
                                            <td className="tablecell">{user.company}</td>
                                            <td className="tablecell">
                                                <button className="btn btn-primary" onClick={()=>{this.props.restoreUser(user)}}>Restore</button>                                                 
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        )
    }
}