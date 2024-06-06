import { useState } from 'react';
import './App.css';

function Header({ onChangeMode, children }) {
    return (
        <header>
            <h1 onClick={() => onChangeMode('HOME')}>{children}</h1>
            <p>우린 모두 초록초록한 청춘이니까</p>
        </header>
    );
}

function Article({ title, content }) {
    return (
        <article>
            <h2>{title}</h2>
            <p>{content}</p>
        </article>
    );
}

function Nav({ onChangeMode, List, onDelete }) {
    return (
        <nav>
            <ol>
                {List.map((item) => (
                    <li key={item.id}>
                        <div onClick={() => onChangeMode(item.id)}>{item.title}</div>
                        <button onClick={() => onDelete(item.id)}>삭제</button>
                    </li>
                ))}
            </ol>
        </nav>
    );
}

function Create({ onCreate }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleClick = () => {
        onCreate(title, content);
        setTitle("");
        setContent("");
    };

    return (
        <div>
            <p>
                <input type="text"
                    placeholder="할 일을 작성하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
            </p>
            <p>
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </p>
            <p>
                <button type="button" onClick={handleClick}>추가하기</button>
            </p>
        </div>
    );
}

function App() {
    const [mode, setMode] = useState('HOME');
    const [id, setId] = useState(-1);
    const [List, setList] = useState([]);

    let title;
    let content;

    if (mode === 'HOME') {
        title = '오늘의 할 일';
        content = '바쁘게 살아야지 얼른 시작해라';
    } else if (mode === 'READ') {
        title = List[id].title;
        content = List[id].content;
    }

    const handleCreate = (title, content) => {
        setList([...List, { title, content, id: List.length }]);
        setMode('HOME');
    };

    const handleDelete = (id) => {
        setList(List.filter(item => item.id !== id));
        setMode('HOME');
    };

    return (
        <div className="container">
            <Header onChangeMode={() => setMode('HOME')}>Dowon TodoList</Header>
            <Nav List={List}
                onChangeMode={(_id) => {
                    setMode('READ');
                    setId(_id);
                }}
                onDelete={handleDelete}
            ></Nav>
            <Article title={title} content={content}></Article>
            {mode === 'CREATE' && <Create onCreate={handleCreate} />}
            {mode === 'HOME' && (
                <button type="button" onClick={() => setMode('CREATE')}>글 생성</button>
            )}
        </div>
    );
}

export default App;
