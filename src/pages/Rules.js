import React from 'react';
import rulesData from '../data/rules.json';
export default function Rules() {
    const [rules, setRules] = React.useState([]);

    React.useEffect(() => {
        setRules(rulesData.rules);
    }, []);

    

    return (
        <div className="container">
            <div className="mt-1 mb-5">
                <h2>Правила опубликования поста в галереи</h2>
                <ul className="list-group">
                    {rules.map((rule, index) => (
                        <li key={index} className="list-group-item">{rule}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
