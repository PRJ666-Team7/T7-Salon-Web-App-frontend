import React, {useState} from 'react';
import {    Dialog,
            DialogTitle,
            DialogContent, 
            DialogContentText, 
            DialogActions,
            TextField,
            Button
} from '@material-ui/core';
import axios from 'axios';
import Cookies from "js-cookie";

function EditService(props){
    const { editDialog, setEditDialog } = props;
    const [ name, setName ] = useState(editDialog.name);
    const [ price, setPrice ] = useState(editDialog.price);


    const handleUpdate = ()=>{

        const data = {id: editDialog.id, name: name.toUpperCase(), price: price}
        console.log(data)
        const token = Cookies.get("jwt");
        axios.post('http://localhost:8000/editSrv', 
        data,
        {headers: {
            authorization: `JWT ${token}`,
          },});
        setEditDialog({...editDialog, isOpen: false});
    }

    const handleClose = ()=>{
        setEditDialog({...editDialog, isOpen: false});
    }

    return (
        <Dialog open={editDialog.isOpen} onClose={handleClose}>
            <DialogTitle>{editDialog.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {editDialog.subTitle}
                </DialogContentText>
                <br />
                

                    <TextField
                        fullWidth
                        id="name"
                        label="Name"
                        defaultValue={editDialog.name}
                        InputLabelProps={{shrink: true,}}
                        variant="outlined"
                        onChange={e=> setName(e.target.value)}
                    />  
                    <br />
                
                    <br />
                    <TextField
                        fullWidth
                        id="price"
                        label="Price"
                        type= "number"
                        defaultValue={editDialog.price}
                        InputLabelProps={{shrink: true,}}
                        variant="outlined"
                        onChange={e=> setPrice(e.target.value)}
                    />  
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdate} color="primary">
                    Update
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default EditService;