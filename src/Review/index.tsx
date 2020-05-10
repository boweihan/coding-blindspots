import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, message } from 'antd';
import ReactMDE from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import PageLoad from '../PageLoad';
import NoSnippetFound from '../NoSnippetFound';
import RestClient from '../shared/rest';
import { addCommentLineWidget } from '../CommentWidget';
import { parseIfJson } from '../shared/util';
import { Editor, EditorOptions } from '../Editor';
import { Snippet, Comment } from '../types';
import styles from './styles.css';
import 'antd/es/button/style';
import 'antd/es/modal/style';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

interface ReviewProps {
  location: {
    hash: string;
  };
}

const widgets: any = [];

const Review = ({ location }: ReviewProps) => {
  const [loaded, setLoaded] = useState(false);
  const [snippet, setSnippet] = useState<Snippet>();
  const [comments, setComments] = useState<Array<Comment>>([]);
  const snippetId = location.hash.slice(1);

  useEffect(() => {
    // todo use Promise.all
    RestClient.get(`/snippets/${snippetId}`)
      .then((snippet) => setSnippet(snippet))
      .then(() =>
        RestClient.get(`/snippets/${snippetId}/comments`)
          .then((comments) => setComments(comments))
          .then(() => setLoaded(true))
      )
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  const createCommentWidgets = (cm: any) => {
    comments?.forEach((comment) => addCommentLineWidget(cm, comment));
  };

  const removeInputWidgets = (cm: any) => {
    for (let i = 0; i < widgets.length; i++) {
      cm.removeLineWidget(widgets[i]);
    }
  };

  const InputWidget = ({ cm, line }: any) => {
    const [value, setValue] = useState('');
    const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
      'write'
    );
    const [commenting, setCommenting] = useState(false);

    const addComment = (comment: Comment) => {
      if (!comment.text) {
        message.error('Comment must not be empty!');
        return;
      }
      setCommenting(true);
      RestClient.post('/comments/', comment)
        .then((response) => {
          setCommenting(false);
          setComments([...comments, response]);
          message.success('Comment added!');
        })
        .catch(() => setCommenting(false));
    };

    return (
      <div className={styles.widgetContainer}>
        <ReactMDE
          className="review__textarea"
          value={value}
          onChange={setValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
        <div className={styles.widgetButtons}>
          <Button type="dashed" onClick={() => removeInputWidgets(cm)}>
            Cancel
          </Button>
          &nbsp;
          <Button
            loading={commenting}
            onClick={() =>
              addComment({
                line,
                text: value,
                snippetId,
              })
            }
          >
            Add Comment
          </Button>
        </div>
      </div>
    );
  };

  const addInputLineWidget = (cm: any, event: any) => {
    removeInputWidgets(cm);
    const line = event.line;
    let div = document.createElement('div');
    ReactDOM.render(<InputWidget cm={cm} line={line} />, div);
    widgets.push(cm.addLineWidget(line, div));
  };

  if (!loaded) {
    return <PageLoad text="Searching For Snippet..." />;
  }

  if (!snippet) {
    return <NoSnippetFound />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{snippet.title}</h2>
      <p>Review Page</p>
      <div>
        <EditorOptions language={snippet.language} />
        <div className={styles.editor}>
          <Editor
            key={JSON.stringify(comments)}
            text={parseIfJson(snippet.text)}
            language={snippet.language}
            onCursor={addInputLineWidget}
            // setTimeout required to avoid JS Execution race condition with CodeMirror
            onMount={(cm: any) => setTimeout(() => createCommentWidgets(cm), 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
