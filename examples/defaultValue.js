// use jsx to render html, do not modify simple.html

import 'rc-editor-mention/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Mention, { toEditorState } from 'rc-editor-mention';

const originSuggestions = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai', 'some suggestion with spaces'];

const Tag = (props) => {
  return (
    <span style={{color: "red"}} data-tag="true">{props.children}</span>
  )
}

class MentionEditor extends React.Component {
  state = {
    suggestions: originSuggestions,
  };
  onSearchChange = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = originSuggestions.filter(suggestion =>
      suggestion.toLowerCase().indexOf(searchValue) !== -1
    );
    this.setState({
      suggestions: filtered,
    });
  }
  reset = () => {
    this.refs.mention.reset();
  }
  render() {
    const { suggestions } = this.state;
    return (
      <div>
        <button onClick={this.reset}> reset </button>
        <Mention style={{ width: 300 }}
          ref="mention"
          onSearchChange={this.onSearchChange}
          defaultValue={toEditorState('hello @afc163 @some suggestion with spaces ')}
          suggestions={suggestions} prefix="@"
          tag={Tag}
        />
      </div>
    );
  }
}

ReactDOM.render(<div>
  <p> you can @ one of afc163, benjycui, yiminghe, jljsj33, simaQ, YuhangGe, dqaria, RaoHai</p>
  <MentionEditor />
</div>, document.getElementById('__react-content'));
