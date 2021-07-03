import React, { Component } from "react";

export default class EditPopup extends Component{

    constructor(props){
        super(props);

        this.addRef=React.createRef();
        this.phoneRef=React.createRef();
        this.companyRef=React.createRef();
    }

    updateEmp=()=>{
        console.log(this.addRef.current.value)

        let upaddress=this.addRef.current.value!==""?this.addRef.current.value:this.props.currentUser.address;
        let upphone=this.phoneRef.current.value!==""?this.phoneRef.current.value:this.props.currentUser.phone;
        let upcompany=this.companyRef.current.value!==""?this.companyRef.current.value:this.props.currentUser.company;
        let UpdatedUser={
            id:this.props.currentUser.id,
            name:this.props.currentUser.name,
            username:this.props.currentUser.username,
            email:this.props.currentUser.email,
            address:upaddress,
            phone:upphone,
            website:this.props.currentUser.website,
            company:upcompany
        };

        this.props.updateEditUser(UpdatedUser);
    }


    render(){
        return(
            <div className="popup-box">
              <div className="box">
                <span className="close-icon" onClick={this.props.handleClose}>x</span>
                <div className="content">
                    <h4>Edit the User : {this.props.currentUser.name}</h4>
                    <hr></hr>
                    <div></div>
                    <div className="row" >
                        <form style={{marginLeft:"50px"}}>
                            <fieldset>
                                <div>
                                   Update Address: <input type="text" className="form-control" name="address" ref={this.addRef} placeholder={this.props.currentUser.address} />
                                </div>
                                <div>
                                    Update Phone: <input type="text" className="form-control" name="phone" ref={this.phoneRef} placeholder={this.props.currentUser.phone} />
                                </div>
                                <div>
                                    Update Company: <input type="text" className="form-control" name="company" ref={this.companyRef} placeholder={this.props.currentUser.company} />
                                </div>
                                <br></br>
                            </fieldset>
                        </form>                                                               
                    </div>
                    <div className="row">
                        <div style={{textAlign:"center",marginLeft:"50px"}}>
                            <button className="btn btn-primary" onClick={this.updateEmp}>Edit</button>
                        </div>
                    </div>     
                </div>
              </div>
            </div>
        )

    }
}