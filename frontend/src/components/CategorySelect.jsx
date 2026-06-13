import { useState } from "react";

function CategorySelect({
                            value,
                            categories = [],
                            options,
                            onChange,
                            placeholder = "Select",
                            icon,
                            showAllOption = false,
                        }) {
    const [open, setOpen] = useState(false);

    const selectOptions = options
        ? options
        : [...categories]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => ({
                value: category.id,
                label: category.name,
            }));

    const selected = selectOptions.find((option) => option.value === value);

    return (
        <div className="custom-select">
            <div
                className="custom-select-header"
                onClick={() => setOpen(!open)}
            >
                <span>
                    {icon ? icon : selected?.label || placeholder}
                </span>
            </div>

            {open && (
                <div className="custom-select-dropdown">
                    {showAllOption && (
                        <div
                            className="custom-select-item"
                            onClick={() => {
                                onChange("");
                                setOpen(false);
                            }}
                        >
                            {placeholder}
                        </div>
                    )}

                    {selectOptions.map((option) => (
                        <div
                            key={option.value}
                            className={`custom-select-item ${
                                value === option.value ? "active" : ""
                            }`}
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategorySelect;