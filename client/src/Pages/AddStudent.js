import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// http://localhost:4000/admin/login


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddStudent() {
  const url = "https://college-project.onrender.com"

  const navigate = useNavigate()
  const [student, setStudent] = React.useState({
    name: '',
    email: '',
    college: '',
    placementStatus: '',
    batch: '',
    dsaScore: '',
    reactScore: '', 
    webDScore: ''
  })
  const [valErr, setValErr] = React.useState({
    name: '',
    email: '',
    college: '',
    placementStatus: '',
    batch: '',
    dsaScore: '',
    reactScore: '', 
    webDScore: ''
  })

  const [open, setOpen] = React.useState(false);
  const [customVariant, setCustomVariant] = React.useState('success')
  const [success, setSuccess] = React.useState('')
  const [error, setError] = React.useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleOnChange = (evt) => {
    setStudent({
      ...student,
      [evt.target.name]: evt.target.value
    })

    setValErr({
      name: '',
      email: '',
      college: '',
      placementStatus: '',
      batch: '',
      dsaScore: '',
      reactScore: '', 
      webDScore: ''
    })
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    if(!student.name){
      setValErr({
        name: 'Please enter name?'
      })
    }else if(!student.email){
      setValErr({
        email: 'Please enter email?'
      })
    }else if(!student.college){
      setValErr({
        college: 'Please enter college name?'
      })
    }else if(!student.placementStatus){
      setValErr({
        placementStatus: 'Please select placement status'
      })
    }else if(!student.batch){
      setValErr({
        batch: 'Please enter batch name?'
      })
    }else if(!student.dsaScore){
      setValErr({
        dsaScore: 'Plase enter DSA Score'
      })
    }else if(!Number(student.dsaScore)){
      setValErr({
        dsaScore: 'Please enter number only?'
      })
    }else if(!student.webDScore){
      setValErr({
        webDScore: 'Please enter Web Dev Score?'
      })
    }else if(!Number(student.webDScore)){
      setValErr({
        webDScore: 'Please enter number only?'
      })
    }else if(!student.reactScore){
      setValErr({
        reactScore: 'Please enter React Score?'
      })
    }else if(!Number(student.reactScore)){
      setValErr({
        reactScore: 'Please enter number only?'
      })
    }else{

      return await axios.post(`${url}/student/addStudent`, student).then((response) => {
        // console.log("response: ", response);
        if(response.data.success){
          setSuccess(response.data.msg)
          setCustomVariant('success')
          setOpen(true)
          setStudent({
            name: '',
            email: '',
            college: '',
            placementStatus: '',
            batch: '',
            dsaScore: '',
            reactScore: '', 
            webDScore: ''
          })
        }else{
          console.log("dont know? add student");
          setError(response.data.msg)
          setCustomVariant('error')
          setOpen(true)
          
        }
        
      }).catch((err) => {
        console.log("err: ", err);
        setCustomVariant('error')
        setError(err.response.data.err)
        setOpen(true)
        setSuccess('')
      })
    }

  };

  // console.log("placement status: ", student);

    return (
        <Container>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={customVariant} sx={{ width: '100%' }}>
                  {success ? success : error}
              </Alert>
          </Snackbar>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, p: 2, backgroundColor: "lightgray", borderRadius: '10px'}}>
          <center>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> <PersonAddAlt1Icon /> </Avatar>
            <Typography component="h1" variant="h5"> Add Student </Typography>
          </center>
            <Grid container spacing={2} sx={{mt: 1}} >
              <Grid item  xs={12}/*  md={12} lg={12} */>
                <TextField style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.name ? true : false} autoComplete="given-name" name="name" value={student.name} onChange={handleOnChange} required fullWidth id="name" label="Name" autoFocus />
                <Typography variant='body1' color={'error'} component="p" >{valErr.name ? valErr.name : ''}</Typography>
              </Grid>

              <Grid item xs={12}  /* md={12} lg={12} */>
                <TextField style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.email ? true : false} required fullWidth id="email" onChange={handleOnChange} label="Email Address" name="email" value={student.email} autoComplete="email" />
                <Typography variant='body1' color={'error'} component="p" >{valErr.email ? valErr.email : ''}</Typography>
              </Grid>

              <Grid item xs={12}  /* md={12} lg={12} */>
                <TextField style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.college ? true : false} required fullWidth id="college" onChange={handleOnChange} label="College Name" name="college" value={student.college} />
                <Typography variant='body1' color={'error'} component="p" >{valErr.college ? valErr.college : ''}</Typography>
              </Grid>

              <Grid item xs={6}  /* md={6} lg={6} */>
                {/* <TextField sx={{ backgroundColor: 'white', borderRadius: '10px'}} error={valErr.college ? true : false} helperText={valErr.college ? valErr.college : ''} required fullWidth id="college" onChange={handleOnChange} label="College Name" name="college" /> */}
                <FormControl style={{ width: '100%'}}>
                  <InputLabel id="demo-simple-select-label"> Placement Status </InputLabel>
                  <Select error={valErr.placementStatus ? true : false} labelId="demo-simple-select-label" value={student.placementStatus} style={{ width: '100%' , backgroundColor: 'white', borderRadius: '5px' }}
                    onChange={(e) => {setStudent({...student, placementStatus: e.target.value}); setValErr({...setValErr, placementStatus: ''})}} >
                      <MenuItem value={"Not Placed"}>Not Placed</MenuItem>
                      <MenuItem value={"Placed"}>Placed</MenuItem>
                  </Select>
                  <Typography variant='body1' color={'error'} component="p" >{valErr.placementStatus ? valErr.placementStatus : ''}</Typography>
                </FormControl>
              </Grid>

              <Grid item xs={6} /*  md={6} lg={6} */>
                <TextField style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.batch ? true : false}  required fullWidth id="batch" onChange={handleOnChange} label="Batch" name="batch" value={student.batch} />
                <Typography variant='body1' color={'error'} component="p" >{valErr.batch ? valErr.batch : ''}</Typography>
              </Grid>

              <Grid item xs={4} /*  md={4} lg={4} */>
                <TextField type={'number'} style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.dsaScore ? true : false} required fullWidth id="dsaScore" onChange={handleOnChange} label="1st Year" name="dsaScore" value={student.dsaScore} InputProps={{inputProps: { max: 100, min: 0 } }} />
                <Typography variant='body1' color={'error'} component="p" >{valErr.dsaScore ? valErr.dsaScore : ''}</Typography>
              </Grid>

              <Grid item xs={4} /*  md={4} lg={4} */>
                <TextField type={'number'} style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.webDScore ? true : false}  required fullWidth id="webDScore" onChange={handleOnChange} label="2nd Year" name="webDScore" value={student.webDScore} InputProps={{inputProps: { max: 100, min: 0 } }} />
                <Typography variant='body1' color={'error'} component="p" >{valErr.webDScore ? valErr.webDScore : ''}</Typography>
              </Grid>

              <Grid item xs={4} /*  md={4} lg={4} */>
                <TextField type={'number'} style={{ backgroundColor: 'white', borderRadius: '5px'}} error={valErr.reactScore ? true : false} required fullWidth id="reactScore" onChange={handleOnChange} label="3rd Year" name="reactScore" value={student.reactScore} InputProps={{inputProps: { max: 100, min: 0 } }} />
                <Typography variant='body1' color={'error'} component="p" >{valErr.reactScore ? valErr.reactScore : ''}</Typography>
              </Grid>

              <Grid item xs={12} /* md={12} lg={12} */>
                <Button type='submit' variant='contained' color='success' fullWidth >ADD</Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
    )
}

export default AddStudent

/* 
<ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid red', }} >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> <PersonAddAlt1Icon /> </Avatar>
                <Typography component="h1" variant="h5"> Add Student </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3,}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>

                        <TextField error={valErr.name ? true : false} helperText={valErr.name ? valErr.name : ''} autoComplete="given-name" name="name" onChange={handleOnChange} required fullWidth id="name" label="Name" autoFocus />

                    </Grid>
                    <Grid item xs={12}>

                        <TextField error={valErr.email ? true : false} helperText={valErr.email ? valErr.email : ''} required fullWidth id="email" onChange={handleOnChange} label="Email Address" name="email" autoComplete="email" />

                    </Grid>
                    <Grid item xs={12}>

                        <TextField error={valErr.password ? true : false} helperText={valErr.password ? valErr.password : ''} required fullWidth name="password" onChange={handleOnChange} label="Password" type="password" id="password" />

                    </Grid>
                    <Grid item xs={12}>

                        <TextField error={valErr.conPass ? true : false} helperText={valErr.conPass ? valErr.conPass : ''} required fullWidth name="conPass" onChange={handleOnChange} label="Confirm Password" type="password" id="conPass" />

                    </Grid>
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 3, mb: 2 }} >Add</Button>
                </Box>
              </Box>
            </Container>
        </ThemeProvider>
*/