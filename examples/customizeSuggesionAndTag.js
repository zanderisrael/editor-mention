// use jsx to render html, do not modify simple.html

import 'rc-editor-mention/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Mention, {toEditorState} from 'rc-editor-mention';

const Nav = Mention.Nav;

const Tag = (props) => {
  const { data } = props;
  return (<span style={{color: 'red'}}>
      <img src={data.avatar_url} className="tag-avatar"/>{props.children}
    </span>);
};

Tag.propTypes = {
  data: PropTypes.object,
  children: PropTypes.any,
};

class MentionEditor extends React.Component {
  state =  {
    contributors: [],
    suggestions: [],
  };

  componentDidMount() {
    fetch('./contributors.json')
      .then(resp => resp.json())
      .then(contributors => this.setState({ contributors }));
  }

  onSearchChange = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = this.state.contributors.filter(contributor =>
      contributor.login.toLowerCase().indexOf(searchValue) !== -1
    );
    const suggestions = filtered.map(suggestion =>
      <Nav style={{ height: 34 }} value={suggestion.login} data={suggestion}>
        <img src={suggestion.avatar_url} className="avatar"/>
        <span className="meta">{suggestion.login}</span>
        <span style={{ float: 'right', color: 'green' }}>{suggestion.contributions}</span>
      </Nav>);
    this.setState({
      suggestions,
    });
  }

  render() {
    const { suggestions } = this.state;
    return (<div>
      <Mention style={{ width: 300 }}
        onSearchChange={this.onSearchChange}
        notFoundContent=""
        mode="immutable"
        suggestions={suggestions}
        tag={Tag}
        defaultValue={toEditorState('hello @afc163 ')}
      />
    </div>);
  }
}

ReactDOM.render(<div>
  <p> you can mention one of ant-design <a href="https://github.com/ant-design/ant-design/graphs/contributors" target="blank">contributors</a></p>
  <MentionEditor />
</div>, document.getElementById('__react-content'));
