import { useState } from "react";

function PasswordInput({ value, onChange, placeholder }) {
    const [show, setShow] = useState(false);

    return (
        <div className="password-field">
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />

            <button
                type="button"
                className="password-eye"
                onClick={() => setShow(!show)}
            >
                {show ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" />
                        <path d="M10.5 10.5C10.2 10.9 10 11.4 10 12C10 13.1 10.9 14 12 14C12.6 14 13.1 13.8 13.5 13.5" stroke="currentColor" strokeWidth="2" />
                        <path d="M6.5 6.8C4.6 8.1 3.3 10 2.5 12C4 15.8 7.6 18.5 12 18.5C13.6 18.5 15.1 18.1 16.4 17.4" stroke="currentColor" strokeWidth="2" />
                        <path d="M9.5 5.8C10.3 5.6 11.1 5.5 12 5.5C16.4 5.5 20 8.2 21.5 12C21.1 13 20.5 13.9 19.8 14.7" stroke="currentColor" strokeWidth="2" />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M2.5 12C4 8.2 7.6 5.5 12 5.5C16.4 5.5 20 8.2 21.5 12C20 15.8 16.4 18.5 12 18.5C7.6 18.5 4 15.8 2.5 12Z" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                )}
            </button>
        </div>
    );
}

export default PasswordInput;