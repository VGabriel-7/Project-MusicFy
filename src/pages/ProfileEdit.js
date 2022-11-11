import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './css/editProfile.css';
import iconLink from '../images/link-quebrado.png';
import iconEmail from '../images/o-email.svg';
import iconDescription from '../images/edit-info.svg';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      nameUser: '',
      imageUser: '',
      emailUser: '',
      descriptionUser: '',
      disable: true,
    };
  }

  componentDidMount() {
    const { history: { push } } = this.props;

    if (!localStorage.getItem('user')) return push('/');

    document.title = 'Edit Profile';
    this.getInformUser();
  }

  validingInput = () => {
    const { nameUser, imageUser, emailUser, descriptionUser } = this.state;
    if (
      nameUser
      && imageUser
      && emailUser.includes('@')
      && descriptionUser
    ) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validingInput);
  }

  getInformUser = () => {
    this.setState(
      { loading: true },
      async () => {
        const objUser = await getUser();
        this.setState({
          nameUser: objUser.name,
          imageUser: objUser.image,
          emailUser: objUser.email,
          descriptionUser: objUser.description,
          loading: false,
        }, this.validingInput);
      },
    );
  }

  uploadUser = async () => {
    const { nameUser, imageUser, emailUser, descriptionUser } = this.state;
    const { history: { push } } = this.props;
    this.setState({ loading: true });
    await updateUser({
      name: nameUser,
      email: emailUser,
      image: imageUser,
      description: descriptionUser,
    });
    push('/profile');
  }

  render() {
    const {
      loading,
      nameUser,
      imageUser,
      emailUser,
      descriptionUser,
      disable,
    } = this.state;
    const susgestionImg = 'https://img.quizur.com/f/img5fcd3c2fc28933.70970546.jpg?lastEdited=1607285813';
    return (
      <div>
        <Header />
        <section className="main-edit-profile">
          {loading
            ? <Loading />
            : (
              <form
                data-testid="page-profile-edit"
                className="form-edit-profile"
              >
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <img className="img-span" src={ iconLink } alt="icon link" />
                  </span>
                  <input
                    className="form-control"
                    placeholder={ `Ex: ${susgestionImg}` }
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    data-testid="edit-input-image"
                    value={ imageUser }
                    name="imageUser"
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text edit-name" id="basic-addon1">@</span>
                  <input
                    className="form-control"
                    value={ nameUser }
                    data-testid="edit-input-name"
                    type="text"
                    name="nameUser"
                    onChange={ this.handleChange }
                    maxLength="10"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <img className="img-span" src={ iconEmail } alt="icon link" />
                  </span>
                  <input
                    className="form-control"
                    value={ emailUser }
                    data-testid="edit-input-email"
                    type="email"
                    name="emailUser"
                    onChange={ this.handleChange }
                    maxLength="20"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <img className="img-span" src={ iconDescription } alt="icon link" />
                  </span>
                  <input
                    className="form-control"
                    value={ descriptionUser }
                    data-testid="edit-input-description"
                    name="descriptionUser"
                    type="textarea"
                    rows="4"
                    cols="50"
                    onChange={ this.handleChange }
                    maxLength="20"
                  />
                </div>
                <button
                  data-testid="edit-button-save"
                  type="submit"
                  disabled={ disable }
                  onClick={ this.uploadUser }
                  className="btn btn-primary"
                >
                  Salvar
                </button>
              </form>
            )}
        </section>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.object,
  push: propTypes.func,
}.isRequired;

export default ProfileEdit;
