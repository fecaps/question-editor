import React from 'react';
import DEFINITIONS from '../../definitions';

class AddColumnImageButton extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      result: [],
      file: null,
      item: props.item
    }
  }

  render() {
    return (
      <th>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            id={'column-file-upload_' + this.state.item}
            type="file"
            name="columnPicture"
            onChange={this.onChange.bind(this)}
            onBlur={this.onBlur.bind(this)}>
          </input>
          <label
            for={'column-file-upload_' + this.state.item}
            class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i>File
          </label>
          <button type="submit">
            <img className="QuestionEditorView-img"
              src={require('../../assets/plus_black.png')}
              alt="Images"/>
          </button>
        </form>
      </th>
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
    formData.append('columnPicture', this.state.file);

    const ROUTE = DEFINITIONS.SERVER_HOST + '/columns/' +
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

export default AddColumnImageButton;
