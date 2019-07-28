import React from 'react';
import styled from 'styled-components';
import capitalize from 'capitalize';

import InputProfil     from 'components/common/InputProfil';
import Info            from 'components/common/Info';
import Avatar          from 'components/common/Avatar';

import EditButtonPng      from 'components/img/edit.png';
import SaveButtonPng      from 'components/img/save.png';

const InformationsContainer = styled.div`
  display         : flex;
  flex-direction  : column;
  justify-content : flex-start;
`;

const Row = styled.div`
  display         : flex;
  flex-drection   : row;
  justify-content : space-between;
  margin-top      : 10px;

  @media(min-width: 600px) {
    width         : 100%;
  }
  @media(min-width: 800px) {
    width         : 80%;
  }
  @media(min-width: 1200px) {
    width         : 40%;
  }
`;

const ContainerAvatar = styled.div`
  display        : flex;
  flex-direction : row;
  justify-content: space-between;
  align-items    : center; 
`;

const AvatarProfil = styled(Avatar)`
  text-align : center;
  height     : 80px;
  width      : 80px;
`;

const EditButton = styled.img`
  width: 5%;
  max-width: 45px;
`;

const SaveButton = styled.img`
  width: 5%;
  max-width: 45px;
`;



class Informations extends React.Component{
  constructor(props){
    super(props);
      this.state = {
          modify : false,
          pseudo : this.props.userProfil.pseudo,
          pseudoError : false,
          firstName : this.props.userProfil.firstName,
          firstNameError : false,
          lastName : this.props.userProfil.lastName,
          lastNameError : false,
          age : this.props.userProfil.age,
          ageError : false,
          email :this.props.userProfil.email,
          emailError : false,
          genre : this.props.userProfil.genre,
          maleChecked : false,
          femaleChecked : false,
          genreError : false,
          avatarUrl : '',
          avatarFile : '',
          presentation : this.props.userProfil.presentation,
          preferences : this.props.userProfil.preferences,
          contactInformation : this.props.userProfil.contactInformation,
          error : false,
          redirect : false
      }
      this.handleAvatarChange             = this.handleAvatarChange.bind(this);
      this.handlePseudoChange             = this.handlePseudoChange.bind(this);
      this.handleFirstNameChange          = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange           = this.handleLastNameChange.bind(this);
      this.handleCheckboxCodeurChange     = this.handleCheckboxCodeurChange.bind(this);
      this.handleCheckboxCodeuseChange    = this.handleCheckboxCodeuseChange.bind(this);
      this.handleAgeChange                = this.handleAgeChange.bind(this);
      this.handleMailChange               = this.handleMailChange.bind(this);
      this.handleGenreChange              = this.handleGenreChange.bind(this);
      this.handleAvatarChange             = this.handleAvatarChange.bind(this);
      this.handlePresentationChange       = this.handlePresentationChange.bind(this);
      this.handlePreferencesChange        = this.handlePreferencesChange.bind(this);
      this.handleContactInformationChange = this.handleContactInformationChange.bind(this);
      this.handleUpdate                   = this.handleUpdate.bind(this);
  }
    handleAvatarChange (event) {
      const file = event.target.files[0] || null;

      if(file) {
        this.setState({
          avatarUrl  : URL.createObjectURL(file),
          avatarFile : file
        });
      }
    }

    handlePseudoChange(event){
      this.setState({
          pseudo : event.target.value,
          pseudoError : false
      });
    }

    handleFirstNameChange(event){
      this.setState({
          firstName : event.target.value,
          firstNameError : false
      });  
    }

    handleLastNameChange(event){
      this.setState({
          lastName : event.target.value,
          lastNameError : false
      });  
    }

    handleCheckboxCodeurChange(){
      if(this.state.maleChecked){
          this.setState({
              maleChecked : !this.state.maleChecked,
              femaleChecked : false,
              genre : ''
          });
      }
      else{
          this.setState({
              maleChecked : !this.state.maleChecked,
              femaleChecked : false,
              genre : 'Codeur'
          });
      }
    }

    handleCheckboxCodeuseChange(){
      if(this.state.femaleChecked){
          this.setState({
              femaleChecked : !this.state.femaleChecked,
              maleChecked : false,
              genre : ''
          });
      }
      else{
          this.setState({
              femaleChecked : !this.state.femaleChecked,
              maleChecked : false,
              genre : 'Codeuse'
          });
      }
    }

    handleAgeChange(event){
      this.setState({
          age : event.target.value,
          ageError : false
      });  
    }

    handleMailChange(event){
      this.setState({
          email : event.target.value,
          emailError : false
      }); 
    }

    handleGenreChange(event){
      this.setState({
          genre : event.target.value,
          genreError : false
      });  
    }

    handlePresentationChange(event){
      this.setState({presentation : event.target.value}); 
    }

    handlePreferencesChange(event){
      this.setState({preferences : event.target.value});  
    }

    handleContactInformationChange(event){
      this.setState({contactInformation : event.target.value});
    }

    handleUpdate(){
      const { update } = this.props;
      let {
        pseudo,
        firstName,
        lastName,
        age,
        email,
        genre,
        avatarUrl,
        avatarFile,
        presentation,
        preferences
    } = this.state;

    firstName     = capitalize(firstName.trim());
    lastName    = capitalize(lastName.trim());

    let hasError = false;

    if (!pseudo) {
        this.setState({pseudoError : true});
        hasError = true;
      }

    if (!firstName) {
      this.setState({firstNameError : true});
      hasError = true;
    }

    if (!lastName) {
      this.setState({lastNameError : true});
      hasError = true;
    }

    if (!age) {
      this.setState({ageError : true});
      hasError = true;
    }

    if (!email) {
      this.setState({emailError : true});
      hasError = true;
    }

    if (!genre) {
        this.setState({genreError : true});
        hasError=true;
    } 

    if (hasError) {
        this.setState({error : true});
        return;
    } 
    else {
        this.setState({error : false});
        const user = {
            pseudo       : this.state.pseudo,
            firstName    : this.state.firstName,
            lastName     : this.state.lastName,
            age          : this.state.age,
            email        : this.state.email,
            genre        : this.state.genre,
            avatarUrl    : this.state.avatarUrl,
            avatarFile   : this.state.avatarFile,
            presentation : this.state.presentation,
            preferences  : this.state.preferences,
            contactInformation : this.state.contactInformation
        }
        this.props.update(user);
        this.setState({modify : false});
      }
    }

  render(){
    const { userProfil, user } = this.props;
    return(
      <div>
        {
          this.state.modify ?
          <InformationsContainer>
            <ContainerAvatar>
              <AvatarProfil user={userProfil}/>
              <SaveButton onClick={this.handleUpdate} src={SaveButtonPng}/>
            </ContainerAvatar>
            <Row>
              <InputProfil label="Pseudo" value={this.state.pseudo} onChange={this.handlePseudoChange} />
              <InputProfil label="Prénom" value={this.state.firstName}  onChange={this.handleFirstNameChange}/>
              <InputProfil label="Nom" value={this.state.lastName} onChange={this.handleLastNameChange}/>
            </Row>
            <Row>
              <InputProfil label="Email" value={this.state.email} onChange={this.handleMailChange}/>
            </Row>
            <Row>
              <InputProfil label="Genre" value={this.state.genre} />
              <InputProfil label="Age" value={this.state.age} onChange={this.handleAgeChange}/>
              <InputProfil label="Préférences" value={this.state.preferences} onChange={this.handlePreferencesChange}/>
            </Row>
            <Row>
              <InputProfil label="Présentation" value={this.state.presentation} onChange={this.handlePresentationChange}/>
              <InputProfil label="Informations" value={this.state.contactInformation} onChange={this.handleContactInformationChange}/>
            </Row>
          </InformationsContainer> : 
          <InformationsContainer>
            <ContainerAvatar>
              <AvatarProfil user={userProfil}/>
              {
                user.role === "admin" || user._id === userProfil._id ?
                <EditButton onClick={() => this.setState({modify : true})} src={EditButtonPng}/> :
                null
              }
            </ContainerAvatar>
            <Row>
              <Info label="Pseudo">{userProfil.pseudo}</Info>
              <Info label="Prénom">{userProfil.firstName}</Info>
              <Info label="Nom">{userProfil.lastName}</Info>
            </Row>
            <Row>
              <Info label="Email">{userProfil.email}</Info>
            </Row>
            <Row>
              <Info label="Genre">{userProfil.genre}</Info>
              <Info label="Age">{userProfil.age} ans</Info>
              <Info label="Préférences">{userProfil.preferences}</Info>
            </Row>
            <Row>
              <Info label="Présentation">{userProfil.presentation}</Info>
              <Info label="Informations">{userProfil.contactInformation}</Info>
            </Row>
          </InformationsContainer>
        }
      </div>
    );
  }
}

export default Informations; 