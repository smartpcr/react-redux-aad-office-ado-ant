import "./Highlighter.scss";
import React from "react";

interface IHighlighterProps {
    value: string;
    searchTerm: string;
}

const Highlighter: React.FunctionComponent<IHighlighterProps> = props => {
    const renderText = (text: string, searchTerm: string) => {
        if (!searchTerm || !searchTerm.length) {
            return text;
        }

        const pattern = new RegExp(`(${searchTerm})`, "gi");
        const splitedText = text.split(pattern);

        return splitedText.map((word, index) => (
            <span
                className={word.toLowerCase() === searchTerm.toLowerCase() ? "highlight" : ""}
                key={index}
            >
                {word}
            </span>
        ));
    };

    return <span>{renderText(props.value, props.searchTerm)}</span>;
};

export default Highlighter;
