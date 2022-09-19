import './App.css';
import React, { Component } from 'react'
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm';
import Rank from '../components/Rank';
// import Clarifai from 'clarifai';
import FaceRecognition from '../components/FaceRecognition';
import Signin from '../components/Signin';
import Register from '../components/Register';


// const app = new Clarifai.App({    // api clint installation       // move to server bcoz of security issues
//   apiKey: '97dbedcefa3342309972705418ceae4a'
// })

const initialState = {
  input: '',
  imageUrl: '',
  faceBoxCoordinates: {},
  route: 'signin',
  isSignIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // componentDidMount() {   // it was only for testing purpose 
  //   fetch('http://localhost:3000')  //npm install cors   // without https:// (security) browser gives 'error' like ->set the request's mode to 'no-cors' to fetch the resource with CORS disabled
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  //   // .then(data => console.log(data));
  // }

  loadUser = (userData) => {
    this.setState({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;  // bounding faceBoxCoordinates is a persentage of image
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }
  }

  // onSignOut = () => this.setState({ route: 'signin' })

  displayFaceBox = (faceBoxCoordinates) => {
    //console.log(faceBoxCoordinates)
    this.setState({ faceBoxCoordinates: faceBoxCoordinates })
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    // console.log('Click');
    //    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)    // trap we have to use input here not ImageUrl and it is big trap . we need to use like  that and it is an advance topic// clarifai document request section (post)     // "a403429f2ddf4b49b307e318f00e528b"

    fetch('https://safe-sands-88406.herokuapp.com/imageurl', {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: this.state.input })
    }).then(response => response.json())
      .then(response => {
        if (response) {

          // Update Entries from Server - best way to do here

          fetch('https://safe-sands-88406.herokuapp.com/image', {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(response => response.json())
            .then(data =>
              this.setState(Object.assign(this.state.user, { entries: data })))
            .catch(err => console.log(err))
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
    // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  }

  onPictureUrlChange = (event) => {    // always use arrow fn for non predefine funtion like programmer made fn
    this.setState({ input: event.target.value })   // always use this.setState({})
  }

  onRouteChange = (route) => {
    if (route === 'home') this.setState({ isSignIn: true })
    else if (route === 'signout') this.setState(initialState)     // initialState is used to remove all old user data which was signed in 
    this.setState({ route: route })
  }

  // updateEntries = (newentrie) => {    // not works --- link to imageLinkForm.js
  //   this.setState(Object.assign(this.state.user, { entries: newentrie }))   // New Learning - Object.assign(this.state.user, { entries: newentrie }))
  // }

  // onUsername = (event) => {
  //   this.setState({ username: event.target.value })
  // }

  // onPassword = (event) => {
  //   this.setState({ password: event.target.value })
  // }

  // onCheck = () => {
  //   if (this.state.password === this.state.pass && this.state.username === this.state.user) { this.setState({ route: 'home' }) }
  // }
  render() {
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn} />
        {
          this.state.route === 'signin' ?
            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />   //onPassword={this.onPassword} onUsername={this.onUsername} onCheck={this.onCheck}
            :
            (this.state.route === 'home' ?
              <div>
                <Logo />
                <Rank user={this.state.user} />
                <ImageLinkForm onPictureUrlChange={this.onPictureUrlChange} onPictureSubmit={this.onPictureSubmit} />
                {/* <ImageLinkForm onPictureUrlChange={this.onPictureUrlChange} onPictureSubmit={this.onPictureSubmit} appUserId={this.state.user.id} updateEntries={this.updateEntries} /> */}
                <FaceRecognition faceBoxCoordinates={this.state.faceBoxCoordinates} imageUrl={this.state.imageUrl} />
              </div>
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
