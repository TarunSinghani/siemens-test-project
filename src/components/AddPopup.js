import React, { Component } from "react";


export default class AddPopup extends Component{

    constructor(props){
        super(props);
        this.nameRef=React.createRef();
        this.usernameRef=React.createRef();
        this.email=React.createRef();
        this.address=React.createRef();
        this.phone=React.createRef();
        this.website=React.createRef();
        this.company=React.createRef();
        this.newUser={};
    }

    addNewUser=()=>{

        if(this.nameRef.current.value && this.usernameRef.current.value && this.email.current.value && this.address.current.value && this.phone.current.value && this.website.current.value && this.company.current.value){
            this.newUser={
                id:this.props.size,
                name:this.nameRef.current.value,
                username:this.usernameRef.current.value,
                email:this.email.current.value,
                address:this.address.current.value,
                phone:this.phone.current.value,
                website:this.website.current.value,
                company:this.company.current.value
           };
        }
        else{
            alert("All Fields are Mandatory");
        }
       
       this.props.addNewUser(this.newUser);
    }

    render(){
        return (
            
            <div className="popup-box">
              <div className="box">
                <span className="close-icon" onClick={this.props.handleClose}>x</span>
                <div className="content">
                    <h4>Add A New User</h4>
                    <hr></hr>
                    <div></div>
                    <div className="row" >
                        <form style={{marginLeft:"50px"}}>
                            <fieldset>
                                <div>
                                    Name: <input type="text" className="form-control" name="name" ref={this.nameRef} placeholder="Enter Name" />
                                </div>
                                <div>
                                    User Name: <input type="text" className="form-control" name="username" ref={this.usernameRef} placeholder="Enter User Name" />
                                </div>
                                <div>
                                    Email: <input type="text" className="form-control" name="email" ref={this.email} placeholder="Enter Email Id" />
                                </div>
                                <div>
                                    Address: <input type="text" className="form-control" name="address" ref={this.address} placeholder="Enter Address" />
                                </div>
                                <div>
                                    Phone: <input type="text" className="form-control" name="phone" ref={this.phone} placeholder="Enter Phone No" />
                                </div>
                                <div>
                                    Website: <input type="text" className="form-control" name="website" ref={this.website} placeholder="Enter Website" />
                                </div>
                                <div>
                                    Company: <input type="text" className="form-control" name="company" ref={this.company} placeholder="Enter Company" />
                                </div>
                                <br></br>
                            </fieldset>
                        </form>                                                               
                    </div>
                    <div className="row">
                        <div style={{textAlign:"center",marginLeft:"50px"}}>
                            <button className="btn btn-primary" onClick={this.addNewUser}>Add</button>
                        </div>
                    </div>     
                </div>
              </div>
            </div>
          );
    }
}