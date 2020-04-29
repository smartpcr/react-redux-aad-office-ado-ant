import "./Input.scss";
import React, { ChangeEvent, KeyboardEvent, useState, useEffect, CSSProperties } from "react";

enum State {
    default = "DEFAULT",
    hover = "HOVER",
    focus = "FOCUS",
    disabled = "DISABLED"
}

interface IInputStyles {
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
}

export interface IInputProps {
    size?: "sm" | "lg" | "md";
    disabled?: boolean;
    readonly?: boolean;
    style?: CSSProperties;
    type?: string;
    name?: string;
    placeholder?: string;
    charLimiting?: number;
    prefix?: string;
    suffix?: string;
    prefixIcon?: string;
    suffixIcon?: string;
    required?: boolean;
    autosize?: boolean;
    value?: string;
    bg?: string | string[];
    borderColor?: string | string[];
    color?: string | string[];
    simpleInput?: boolean;
    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;
    onBlur?(event: ChangeEvent<HTMLInputElement>): void;
    onFocus?(event: ChangeEvent<HTMLInputElement>): void;
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

const Input: React.FunctionComponent<IInputProps> = props => {
    const [value, setValue] = useState(props.value);

    useEffect(() => setValue(props.value), [props.value]);

    const getStyles = (
        state: State,
        bg: string | string[] = props.bg ?? [],
        border: string | string[] = props.borderColor ?? "",
        color: string | string[] = props.color ?? ""
    ) => {
        let styleIndex = 0;

        switch (state) {
            case State.default:
                styleIndex = 0;
                break;
            case State.hover:
                styleIndex = 1;
                break;
            case State.focus:
                styleIndex = 2;
                break;
            case State.disabled:
                styleIndex = 3;
                break;
            default:
                styleIndex = 0;
        }

        return {
            backgroundColor: bg instanceof Array ? bg[styleIndex] : bg,
            borderColor: border instanceof Array ? border[styleIndex] : border,
            color: color instanceof Array ? color[styleIndex] : color
        };
    };

    const [inputStyles, setInputStyles] = useState<IInputStyles>(getStyles(State.default));

    let prefix_icon = null;
    let prefix = null;

    let suffix_icon = null;
    let suffix = null;

    let char_limiting = null;

    if (props.prefixIcon) {
        prefix_icon = (
            <div className="input-prefix input-icon" style={props.style}>
                <span className={props.prefixIcon} />
            </div>
        );
    }

    if (props.suffixIcon) {
        suffix_icon = (
            <div className="input-suffix input-icon" style={props.style}>
                <span className={props.suffixIcon} />
            </div>
        );
    }

    if (props.prefix) {
        prefix = <div style={props.style} className="input-prefix">{props.prefix}</div>;
    }

    if (props.suffix) {
        suffix = <div style={props.style} className="input-suffix">{props.suffix}</div>;
    }

    if (props.charLimiting && props.charLimiting > 0) {
        char_limiting = (
            <div style={props.style} className="char-limiting">
                {props.charLimiting - (value?.length ?? 0) > 0 ? props.charLimiting - (value?.length ?? 0) : 0}
            </div>
        );
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        props.onChange && props.onChange(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 13) {
            props.onKeyDown && props.onKeyDown(event);
            event.preventDefault();
        }
    };

    const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
        if (!props.disabled) {
            setInputStyles(getStyles(State.focus));
            props.onFocus && props.onFocus(event);
        }
    };

    const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
        if (!props.disabled) {
            setInputStyles(getStyles(State.default));
            props.onBlur && props.onBlur(event);
        }
    };

    return (
        <div className="tc-input">
            <div className="tc-input-wrap">
                {prefix_icon}

                {prefix}

                <div className="input-infix">
                    <input
                        className="input-control"
                        type={props.type}
                        name={props.name}
                        style={{ ...inputStyles, ...props.style }}
                        placeholder={props.placeholder}
                        maxLength={props.charLimiting}
                        readOnly={props.readonly}
                        required={props.required}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        value={value}
                        onChange={handleChange}
                    />
                </div>

                {suffix}

                {suffix_icon}

                {char_limiting}
            </div>
        </div>
    );
};

Input.defaultProps = {
    simpleInput: true,
    type: "text",
    name: "",
    size: "md",
    readonly: false,
    disabled: false,
    required: false,
    autosize: false,
    value: ""
};

export default Input;
