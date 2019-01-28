import React from 'react';
import DEFINITIONS from '../../definitions';

class AddRowImageButton extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      result: [],
      file: null,
      item: props.item
    };
  }

  render() {
    return (
      <td>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            id={'row-file-upload_' + this.state.item}
            type="file"
            name="rowPicture"
            onChange={this.onChange.bind(this)}
            onBlur={this.onBlur.bind(this)}>
          </input>
          <label
            for={'row-file-upload_' + this.state.item}
            class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i>File
          </label>
          <button type="submit">
            <img className="QuestionEditorView-img"
              src={require('../../assets/plus_black.png')}
              alt="Images"/>
          </button>
        </form>
      </td>
    );
  }

  onChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  onBlur(event) {
    this.setState({ file: event.target.files[0] });
  }

  onSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('rowPicture', this.state.file);

    const ROUTE = DEFINITIONS.SERVER_HOST + '/rows/' +
     this.state.item + '/images';

    fetch(ROUTE, {
      method: 'PUT',
      body: formData
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ isLoaded: true, result: response.result });
        window.location.reload();
      },
      error => {
        this.setState({ isLoaded: true, error });
      })
  }
}

export default AddRowImageButton;
