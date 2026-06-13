import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";
import ImageUploader from "../components/ImageUploader";
import CategorySelect from "../components/CategorySelect";

function AdminPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    const [activePage, setActivePage] = useState("dashboard");
    const [profileView, setProfileView] = useState("main");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [adminProducts, setAdminProducts] = useState([]);
    const [totalProductsCount, setTotalProductsCount] = useState(0);
    const [recentProducts, setRecentProducts] = useState([]);
    const [adminProductPage, setAdminProductPage] = useState(0);
    const [adminProductTotalPages, setAdminProductTotalPages] = useState(0);
    const [adminCategories, setAdminCategories] = useState([]);
    const [adminCategoryPage, setAdminCategoryPage] = useState(0);
    const adminCategoriesPerPage = 6;

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [description, setDescription] = useState("");
    const [newArrival, setNewArrival] = useState(false);
    const [adminProductCategoryFilter, setAdminProductCategoryFilter] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedProductFile, setSelectedProductFile] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);

    const [newCategoryName, setNewCategoryName] = useState("");
    const [categoryDeleteTarget, setCategoryDeleteTarget] = useState(null);
    const [categoryDeleteConfirmOpen, setCategoryDeleteConfirmOpen] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState("");


    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmProfileOpen, setConfirmProfileOpen] = useState(false);

    const [admins, setAdmins] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");
    const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUsername, setCurrentUsername] = useState("");

    const [newAdminUsername, setNewAdminUsername] = useState("");
    const [newAdminPassword, setNewAdminPassword] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deletePassword, setDeletePassword] = useState("");

    const [productDeleteTarget, setProductDeleteTarget] = useState(null);
    const [productDeleteConfirmOpen, setProductDeleteConfirmOpen] = useState(false);

    const [newPasswordError, setNewPasswordError] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const [newAdminPasswordError, setNewAdminPasswordError] = useState("");
    const [newAdminUsernameError, setNewAdminUsernameError] = useState("");

    const [loadingAction, setLoadingAction] = useState("");

    const clearAllFields = () => {
        setUsername("");
        setPassword("");

        setNewUsername("");
        setNewPassword("");
        setOldPassword("");

        setAvatarPreview("");
        setSelectedAvatarFile(null);

        setNewPasswordError("");
        setOldPasswordError("");

        setNewAdminUsername("");
        setNewAdminPassword("");
        setNewAdminUsernameError("");
        setNewAdminPasswordError("");

        setDeletePassword("");
        setDeleteTarget(null);
        setConfirmOpen(false);

        setProductName("");
        setPrice("");
        setNewArrival(false);
        setDescription("");
        setCategoryId("");
        setImageUrl("");
        setSelectedProductFile(null);
        setEditingProductId(null);

        setProductDeleteTarget(null);
        setProductDeleteConfirmOpen(false);

        setCategoryDeleteTarget(null);
        setCategoryDeleteConfirmOpen(false);
        setEditingCategoryId(null);
        setEditingCategoryName("");

        setLoadingAction("");
    };

    const handleUnauthorized = () => {
        localStorage.removeItem("token");
        clearAllFields();
        setProfileView("main");
        setActivePage("dashboard");
        setCurrentUsername("");
        setCurrentUserId(null);
        setAvatarUrl("");
        setIsLoggedIn(false);
        toast.error("Session expired. Please login again.");
    };

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
        };
    };

    const handleAuthResponse = async (res) => {
        if (res.status === 401 || res.status === 403) {
            handleUnauthorized();
            return null;
        }

        return res;
    };

    const loadCurrentUser = () => {
        fetch("http://localhost:8080/admin/users/me", {
            headers: getAuthHeaders(),
        })
            .then(handleAuthResponse)
            .then((res) => {
                if (!res) return null;
                return res.json();
            })
            .then((data) => {
                if (!data) return;

                setCurrentUsername(data.username);
                setCurrentUserId(data.id);
                setAvatarUrl(data.avatarUrl || "");
            })
            .catch(() => {
                toast.error("Failed to load current user");
            });
    };

    const loadAdmins = () => {
        fetch("http://localhost:8080/admin/users", {
            headers: getAuthHeaders(),
        })
            .then(handleAuthResponse)
            .then((res) => {
                if (!res) return null;
                return res.json();
            })
            .then((data) => {
                if (data) setAdmins(data);
            })
            .catch(() => {
                toast.error("Failed to load admins");
            });
    };

    const loadProducts = (filterCategoryId = "", page = adminProductPage) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("size", "5");
        params.append("sort", "newest");

        if (filterCategoryId) {
            params.append("categoryId", filterCategoryId);
        }

        fetch(`http://localhost:8080/products?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setAdminProducts(data.items || []);
                setAdminProductPage(data.currentPage || 0);
                setAdminProductTotalPages(data.totalPages || 0);
                setTotalProductsCount(data.totalItems || data.totalElements || 0);
            })
            .catch(() => toast.error("Failed to load products"));
    };

    const loadRecentProducts = () => {
        const params = new URLSearchParams();

        params.append("page", "0");
        params.append("size", "5");
        params.append("sort", "newest");

        fetch(`http://localhost:8080/products?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setRecentProducts(data.items || []);
            })
            .catch(() => toast.error("Failed to load recent products"));
    };

    const loadCategories = () => {
        fetch("http://localhost:8080/categories")
            .then((res) => res.json())
            .then((data) => setAdminCategories(data))
            .catch(() => toast.error("Failed to load categories"));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        const checkAuth = async () => {
            if (!token) {
                setAuthChecked(true);
                return;
            }

            try {
                const res = await fetch("http://localhost:8080/admin/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    return;
                }

                const data = await res.json();

                setIsLoggedIn(true);
                setCurrentUsername(data.username);
                setCurrentUserId(data.id);
                setAvatarUrl(data.avatarUrl || "");
            } catch {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            } finally {
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            loadProducts("", adminProductPage);
            loadRecentProducts();
            loadCategories();
            loadAdmins();
            loadCurrentUser();
        }
    }, [isLoggedIn]);

    const handleLogin = () => {
        fetch("http://localhost:8080/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setPassword("");
                    setIsLoggedIn(true);
                    toast.success("Login successful");
                } else {
                    toast.error("Invalid login");
                }
            })
            .catch(() => toast.error("Login failed"));
    };

    const logout = () => {
        localStorage.removeItem("token");
        clearAllFields();

        setProfileView("main");
        setActivePage("dashboard");
        setCurrentUsername("");
        setCurrentUserId(null);
        setAvatarUrl("");
        setIsLoggedIn(false);

        toast.success("Logged out");
    };

    const formatPrice = (price, currency) => {
        if (currency === "UZS") {
            return `${Number(price).toLocaleString()} so'm`;
        }

        return `$${price}`;
    };

    const validatePassword = (passwordValue) => {
        if (!passwordValue.trim()) return "Password is required";
        if (passwordValue.length < 6) return "Password must be at least 6 characters";
        return "";
    };

    const handleAvatarUpload = async (file) => {
        if (!file) {
            toast.error("Please select an image");
            return false;
        }

        if (!currentUserId) {
            toast.error("Current user not loaded yet");
            return false;
        }

        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("http://localhost:8080/admin/upload", {
            method: "POST",
            headers: getAuthHeaders(),
            body: formData,
        });

        const checkedUploadRes = await handleAuthResponse(uploadRes);
        if (!checkedUploadRes) return false;

        const uploadData = await checkedUploadRes.json();

        if (!uploadData.url) {
            toast.error(uploadData.message || uploadData.error || "Upload failed");
            return false;
        }

        const avatarRes = await fetch(`http://localhost:8080/admin/users/${currentUserId}/avatar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify({ avatarUrl: uploadData.url }),
        });

        const checkedAvatarRes = await handleAuthResponse(avatarRes);
        if (!checkedAvatarRes) return false;

        setAvatarUrl(uploadData.url);
        setAvatarPreview("");
        setSelectedAvatarFile(null);
        loadCurrentUser();
        loadAdmins();

        return true;
    };

    const updateProfile = () => {
        setOldPasswordError("");
        setNewPasswordError("");

        let hasError = false;

        if (!oldPassword.trim()) {
            setOldPasswordError("Old password is required");
            hasError = true;
        }

        if (!newUsername.trim() && !newPassword.trim() && !selectedAvatarFile) {
            toast.error("Nothing to update");
            return;
        }

        if (newPassword.trim()) {
            if (newPassword.length < 6) {
                setNewPasswordError("Password must be at least 6 characters");
                hasError = true;
            }

            if (newPassword === oldPassword) {
                setNewPasswordError("New password cannot be same as old password");
                hasError = true;
            }
        }

        if (hasError) return;

        setLoadingAction("updateProfile");

        fetch(`http://localhost:8080/admin/users/${currentUserId}/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify({
                newUsername,
                newPassword,
                oldPassword,
            }),
        })
            .then(handleAuthResponse)
            .then((res) => {
                if (!res) return null;
                return res.json();
            })
            .then(async (data) => {
                if (!data) {
                    setLoadingAction("");
                    return;
                }

                if (data.message) {
                    toast.error(data.message);
                    setLoadingAction("");
                    return;
                }

                if (selectedAvatarFile) {
                    const avatarUpdated = await handleAvatarUpload(selectedAvatarFile);
                    if (!avatarUpdated) {
                        setLoadingAction("");
                        return;
                    }
                }

                toast.success("Profile updated");
                setLoadingAction("");

                setTimeout(() => {
                    logout();
                }, 1200);
            })
            .catch(() => {
                toast.error("Profile update failed");
                setLoadingAction("");
            });
    };

    const deleteAdmin = (id, adminUsername) => {
        if (adminUsername === currentUsername) {
            toast.error("You cannot delete your own account");
            return;
        }

        setDeleteTarget({ id, username: adminUsername });
        setConfirmOpen(true);
    };

    const confirmDeleteAdmin = () => {
        if (!deletePassword.trim()) {
            toast.error("Password is required");
            return;
        }

        setLoadingAction("deleteAdmin");

        fetch(`http://localhost:8080/admin/users/${deleteTarget.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify({
                password: deletePassword,
            }),
        })
            .then(handleAuthResponse)
            .then((res) => {
                if (!res) return null;

                if (!res.ok) {
                    throw new Error("Wrong password");
                }

                return res.text();
            })
            .then((result) => {
                if (result === null) return;

                toast.success("Admin deleted");
                setConfirmOpen(false);
                setDeletePassword("");
                setDeleteTarget(null);
                loadAdmins();
                setLoadingAction("");
            })
            .catch(() => {
                toast.error("Wrong password");
                setLoadingAction("");
            });
    };

    const addAdmin = () => {
        setNewAdminUsernameError("");
        setNewAdminPasswordError("");

        let hasError = false;

        if (!newAdminUsername.trim()) {
            setNewAdminUsernameError("Username is required");
            hasError = true;
        }

        const passwordError = validatePassword(newAdminPassword);
        if (passwordError) {
            setNewAdminPasswordError(passwordError);
            hasError = true;
        }

        if (hasError) return;

        setLoadingAction("addAdmin");

        fetch("http://localhost:8080/admin/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify({
                username: newAdminUsername,
                password: newAdminPassword,
            }),
        })
            .then(handleAuthResponse)
            .then((res) => {
                if (!res) return null;
                return res.json();
            })
            .then((data) => {
                if (!data) return;

                if (data.message) {
                    toast.error(data.message);
                    setLoadingAction("");
                    return;
                }

                toast.success("Admin added");
                setNewAdminUsername("");
                setNewAdminPassword("");
                setNewAdminUsernameError("");
                setNewAdminPasswordError("");
                loadAdmins();
                setLoadingAction("");
            })
            .catch(() => {
                toast.error("Something went wrong");
                setLoadingAction("");
            });
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        fetch("http://localhost:8080/admin/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify({ name: newCategoryName }),
        })
            .then(handleAuthResponse)
            .then((res) => {
                if (!res) return null;
                return res.json();
            })
            .then((data) => {
                if (!data) return;

                setNewCategoryName("");
                loadCategories();
                toast.success("Category added");
            })
            .catch(() => toast.error("Category add failed"));
    };

    const handleDeleteCategory = (category) => {
        setCategoryDeleteTarget(category);
        setCategoryDeleteConfirmOpen(true);
    };

    const toggleFeaturedCategory = (id) => {
        fetch(`http://localhost:8080/categories/${id}/featured`, {
            method: "PUT",
            headers: {
                ...getAuthHeaders(),
            },
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((message) => {
                        throw new Error(message || "Failed to update category");
                    });
                }

                return res.json();
            })
            .then(() => {
                toast.success("Category featured status updated");
                loadCategories();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const confirmDeleteCategory = () => {
        if (!categoryDeleteTarget) return;

        setLoadingAction("deleteCategory");

        fetch(`http://localhost:8080/admin/categories/${categoryDeleteTarget.id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        })
            .then(handleAuthResponse)
            .then((res) => {
                if (!res) return null;

                if (!res.ok) {
                    toast.error("Cannot delete category with products");
                    setLoadingAction("");
                    return null;
                }

                toast.success("Category deleted");
                setCategoryDeleteConfirmOpen(false);
                setCategoryDeleteTarget(null);
                loadCategories();
                setLoadingAction("");
                return true;
            })
            .catch(() => {
                toast.error("Something went wrong");
                setLoadingAction("");
            });
    };

    const updateCategory = () => {
        if (!editingCategoryName.trim()) {
            toast.error("Category name is required");
            return;
        }

        setLoadingAction("updateCategory");

        fetch(`http://localhost:8080/admin/categories/${editingCategoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeaders(),
            },
            body: JSON.stringify({
                name: editingCategoryName,
            }),
        })
            .then(handleAuthResponse)
            .then((res) => {
                if (!res) return null;

                if (!res.ok) {
                    toast.error("Category update failed");
                    setLoadingAction("");
                    return null;
                }

                return res.json();
            })
            .then((data) => {
                if (!data) return;

                toast.success("Category updated");
                setEditingCategoryId(null);
                setEditingCategoryName("");
                loadCategories();
                setLoadingAction("");
            })
            .catch(() => {
                toast.error("Something went wrong");
                setLoadingAction("");
            });
    };

    const clearForm = () => {
        setEditingProductId(null);
        setProductName("");
        setPrice("");
        setCurrency("USD");
        setDescription("");
        setCategoryId("");
        setImageUrl("");
        setSelectedProductFile(null);
    };

    const saveProduct = async () => {
        if (!productName.trim()) {
            toast.error("Product name is required");
            return;
        }

        if (!price) {
            toast.error("Price is required");
            return;
        }

        if (!categoryId) {
            toast.error("Category is required");
            return;
        }

        setLoadingAction("saveProduct");

        let finalImageUrl = imageUrl;

        try {
            if (selectedProductFile) {
                const formData = new FormData();

                if (selectedProductFile instanceof File) {
                    formData.append("file", selectedProductFile, selectedProductFile.name);
                }

                const uploadRes = await fetch("http://localhost:8080/admin/upload", {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: formData,
                });

                const checkedUploadRes = await handleAuthResponse(uploadRes);
                if (!checkedUploadRes) {
                    setLoadingAction("");
                    return;
                }

                const uploadData = await checkedUploadRes.json();

                if (!uploadData.url) {
                    toast.error("Image upload failed");
                    setLoadingAction("");
                    return;
                }

                finalImageUrl = uploadData.url;
            }

            const url = editingProductId
                ? `http://localhost:8080/admin/products/${editingProductId}`
                : "http://localhost:8080/admin/products";

            const method = editingProductId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify({
                    name: productName,
                    price: Number(price),
                    categoryId: Number(categoryId),
                    imageUrl: finalImageUrl,
                    currency,
                    newArrival,
                    description,
                }),
            });

            const checkedRes = await handleAuthResponse(res);
            if (!checkedRes) {
                setLoadingAction("");
                return;
            }

            toast.success(editingProductId ? "Product updated" : "Product added");

            clearForm();
            loadProducts(adminProductCategoryFilter);
            setLoadingAction("");
        } catch {
            toast.error("Something went wrong");
            setLoadingAction("");
        }
    };

    const handleEdit = (product) => {
        setEditingProductId(product.id);
        setProductName(product.name);
        setPrice(product.price);
        setCurrency(product.currency || "USD");
        setDescription(product.description || "");
        setImageUrl(product.imageUrl || "");
        setSelectedProductFile(null);
        setNewArrival(product.newArrival || false);

        const foundCategory = adminCategories.find(
            (category) => category.name === product.categoryName
        );

        setCategoryId(foundCategory ? foundCategory.id : "");
        setActivePage("products");
    };

    const handleDelete = (product) => {
        setProductDeleteTarget(product);
        setProductDeleteConfirmOpen(true);
    };

    const confirmDeleteProduct = () => {
        if (!productDeleteTarget) return;

        setLoadingAction("deleteProduct");

        fetch(`http://localhost:8080/admin/products/${productDeleteTarget.id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        })
            .then(handleAuthResponse)
            .then((res) => {
                if (!res) return null;

                toast.success("Product deleted");
                setProductDeleteConfirmOpen(false);
                setProductDeleteTarget(null);
                loadProducts(adminProductCategoryFilter);
                setLoadingAction("");
                return true;
            })
            .catch(() => {
                toast.error("Something went wrong");
                setLoadingAction("");
            });
    };

    if (!authChecked) {
        return <div className="page">Checking login...</div>;
    }

    if (!isLoggedIn) {
        return (
            <div className="page">
                <div className="admin-login">
                    <h2>Admin Login</h2>

                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <PasswordInput
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        );
    }

    const featuredCategoriesCount = adminCategories.filter(
        (category) => category.featured
    ).length;

    const adminCategoryTotalPages = Math.ceil(
        adminCategories.length / adminCategoriesPerPage
    );

    const visibleAdminCategories = adminCategories.slice(
        adminCategoryPage * adminCategoriesPerPage,
        adminCategoryPage * adminCategoriesPerPage + adminCategoriesPerPage
    );

    const handleAdminNav = (page, extraAction = null) => {
        setActivePage(page);

        if (extraAction) {
            extraAction();
        }

        setSidebarOpen(false);
    };

    return (
        <div className="admin-layout">
            <aside className={sidebarOpen ? "admin-sidebar open" : "admin-sidebar"}>
                <div className="sidebar-user">
                    {avatarUrl ? (
                        <img src={`http://localhost:8080${avatarUrl}`} alt="Admin avatar" />
                    ) : (
                        <div className="sidebar-avatar-placeholder">👤</div>
                    )}

                    <p>{currentUsername}</p>
                </div>

                <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    ☰ Admin
                </button>

                <button onClick={() => handleAdminNav("dashboard")}>Dashboard</button>

                <button
                    onClick={() =>
                        handleAdminNav("profile", () => {
                            loadAdmins();
                            loadCurrentUser();
                        })
                    }
                >
                    Profile
                </button>

                <button onClick={() => handleAdminNav("products")}>Products</button>
                <button onClick={() => handleAdminNav("categories")}>Categories</button>
                <button
                    className="logout-button"
                    onClick={() => {
                        setSidebarOpen(false);
                        logout();
                    }}
                >
                    Logout
                </button>
            </aside>

            <main className="admin-content">
                {activePage === "dashboard" && (
                    <div className="dashboard-page">
                        <h2>Dashboard</h2>
                        <p className="dashboard-subtitle">
                            Overview of your shop management.
                        </p>

                        <div className="dashboard-stats">
                            <div className="dashboard-card">
                                <h3>{totalProductsCount}</h3>
                                <p>Products</p>
                            </div>

                            <div className="dashboard-card">
                                <h3>{adminCategories.length}</h3>
                                <p>Categories</p>
                            </div>
                        </div>

                        <div className="dashboard-recent">
                            <h3>Recent 5 Products</h3>

                            {recentProducts.length === 0 ? (
                                <p className="empty-text">No products yet</p>
                            ) : (
                                recentProducts.map((product) => (
                                    <div className="dashboard-recent-row" key={product.id}>
                                        {product.imageUrl ? (
                                            <img
                                                src={`http://localhost:8080${product.imageUrl}`}
                                                alt={product.name}
                                            />
                                        ) : (
                                            <div className="dashboard-product-placeholder">📦</div>
                                        )}

                                        <div>
                                            <strong>{product.name}</strong>
                                            <p>{product.categoryName}</p>
                                        </div>
                                        <span>
                                            {formatPrice(product.price, product.currency)}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activePage === "profile" && (
                    <div className="admin-login">
                        {profileView === "main" && (
                            <>
                                <h2>Profile Settings</h2>

                                <div className="profile-main-avatar">
                                    {avatarUrl ? (
                                        <img src={`http://localhost:8080${avatarUrl}`} alt="avatar" />
                                    ) : (
                                        <div className="profile-avatar-placeholder">👤</div>
                                    )}

                                    <p>Current Admin</p>
                                    <h3>{currentUsername}</h3>
                                </div>

                                <div className="profile-options">
                                    <button
                                        onClick={() => {
                                            clearAllFields();
                                            setProfileView("edit");
                                        }}
                                    >
                                        Edit Profile
                                    </button>

                                    <button onClick={() => setProfileView("admins")}>
                                        List of Admins
                                    </button>

                                    <button
                                        onClick={() => {
                                            clearAllFields();
                                            setProfileView("add");
                                        }}
                                    >
                                        Add New Admin
                                    </button>
                                </div>
                            </>
                        )}

                        {profileView !== "main" && (
                            <button className="back-button" onClick={() => setProfileView("main")}>
                                ← Back
                            </button>
                        )}

                        {profileView === "edit" && (
                            <>
                                <h2>Edit Profile</h2>

                                <div className="profile-main-avatar">
                                    {avatarPreview || avatarUrl ? (
                                        <img
                                            src={avatarPreview ? avatarPreview : `http://localhost:8080${avatarUrl}`}
                                            alt="avatar"
                                        />
                                    ) : (
                                        <div className="profile-avatar-placeholder">👤</div>
                                    )}

                                    <ImageUploader
                                        label="Change Avatar"
                                        preview={avatarPreview || avatarUrl}
                                        onImageReady={(file, previewUrl) => {
                                            setSelectedAvatarFile(file);
                                            setAvatarPreview(previewUrl);
                                        }}
                                    />
                                </div>

                                <input
                                    placeholder="New Username"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />

                                <PasswordInput
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setNewPasswordError("");
                                    }}
                                />
                                {newPasswordError && (
                                    <p className="field-error">{newPasswordError}</p>
                                )}

                                <PasswordInput
                                    placeholder="Old Password (required)"
                                    value={oldPassword}
                                    onChange={(e) => {
                                        setOldPassword(e.target.value);
                                        setOldPasswordError("");
                                    }}
                                />
                                {oldPasswordError && (
                                    <p className="field-error">{oldPasswordError}</p>
                                )}

                                <button onClick={() => setConfirmProfileOpen(true)}>
                                    Save Changes
                                </button>
                            </>
                        )}

                        {profileView === "admins" && (
                            <>
                                <h2>List of Admins</h2>

                                {admins.map((admin) => (
                                    <div className="admin-product-row" key={admin.id}>
                                        <div className="admin-user-info">
                                            {admin.avatarUrl ? (
                                                <img
                                                    src={`http://localhost:8080${admin.avatarUrl}`}
                                                    alt="avatar"
                                                    className="admin-avatar"
                                                />
                                            ) : (
                                                <div className="admin-avatar-placeholder">👤</div>
                                            )}

                                            <span>
                                                {admin.username}
                                                {admin.id === currentUserId && (
                                                    <span className="you-badge"> (You)</span>
                                                )}
                                            </span>
                                        </div>

                                        <button
                                            className="delete-button"
                                            disabled={admin.id === currentUserId}
                                            title={admin.id === currentUserId ? "You cannot delete yourself" : "Delete admin"}
                                            onClick={() => deleteAdmin(admin.id, admin.username)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}

                        {profileView === "add" && (
                            <>
                                <h2>Add New Admin</h2>

                                <input
                                    placeholder="New admin username"
                                    value={newAdminUsername}
                                    onChange={(e) => {
                                        setNewAdminUsername(e.target.value);
                                        setNewAdminUsernameError("");
                                    }}
                                />
                                {newAdminUsernameError && (
                                    <p className="field-error">{newAdminUsernameError}</p>
                                )}

                                <PasswordInput
                                    placeholder="New admin password"
                                    value={newAdminPassword}
                                    onChange={(e) => {
                                        setNewAdminPassword(e.target.value);
                                        setNewAdminPasswordError("");
                                    }}
                                />
                                {newAdminPasswordError && (
                                    <p className="field-error">{newAdminPasswordError}</p>
                                )}

                                <button
                                    onClick={addAdmin}
                                    disabled={loadingAction === "addAdmin"}
                                >
                                    {loadingAction === "addAdmin" ? "Adding..." : "Add Admin"}
                                </button>
                            </>
                        )}
                    </div>
                )}

                {activePage === "categories" && (
                    <div className="admin-login">
                        <h2>Add Category</h2>

                        <div className="input-counter-wrapper">

                            <input
                                type="text"
                                value={newCategoryName}
                                maxLength={10}
                                placeholder="Category Name"
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                className={
                                    newCategoryName.length >= 10
                                        ? "input-limit-error"
                                        : ""
                                }
                            />

                            <span className={`input-counter-inside ${
                                newCategoryName.length >= 10 ? "limit-reached" : ""
                            }`}>
                                {newCategoryName.length}/10
                            </span>

                        </div>

                        <button onClick={handleAddCategory}>Add Category</button>

                        <h2>Categories</h2>

                        {adminCategories.length === 0 ? (
                            <p className="empty-text">No categories yet</p>
                        ) : (
                            visibleAdminCategories.map((category) => (
                                <div className="category-row" key={category.id}>
                                    {editingCategoryId === category.id ? (
                                        <>
                                            <input
                                                className="category-edit-input"
                                                value={editingCategoryName}
                                                onChange={(e) => setEditingCategoryName(e.target.value)}
                                                autoFocus
                                            />

                                            <div className="category-actions">
                                                <button
                                                    className="edit-button"
                                                    disabled={loadingAction === "updateCategory"}
                                                    onClick={updateCategory}
                                                >
                                                    {loadingAction === "updateCategory" ? "Saving..." : "💾"}
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setEditingCategoryId(null);
                                                        setEditingCategoryName("");
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="category-info">
                                                <span className="product-name">{category.name}</span>
                                            </div>

                                            <div className="category-actions">

                                                <button
                                                    className={`featured-category-button ${
                                                        category.featured ? "active" : ""
                                                    }`}
                                                    disabled={!category.featured && featuredCategoriesCount >= 3}
                                                    onClick={() => toggleFeaturedCategory(category.id)}
                                                >
                                                    ⭐
                                                </button>

                                                <button
                                                    className="edit-button"
                                                    onClick={() => {
                                                        setEditingCategoryId(category.id);
                                                        setEditingCategoryName(category.name);
                                                    }}
                                                >
                                                    ✏️
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    onClick={() => handleDeleteCategory(category)}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}

                        {adminCategoryTotalPages > 1 && (
                            <div className="pagination admin-pagination category-pagination">
                                <button
                                    className="pagination-button"
                                    disabled={adminCategoryPage === 0}
                                    onClick={() => setAdminCategoryPage(adminCategoryPage - 1)}
                                >
                                    ←
                                </button>

                                {Array.from({ length: adminCategoryTotalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        className={
                                            adminCategoryPage === index
                                                ? "pagination-button active"
                                                : "pagination-button"
                                        }
                                        onClick={() => setAdminCategoryPage(index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    className="pagination-button"
                                    disabled={adminCategoryPage === adminCategoryTotalPages - 1}
                                    onClick={() => setAdminCategoryPage(adminCategoryPage + 1)}
                                >
                                    →
                                </button>
                            </div>
                        )}

                    </div>
                )}

                {activePage === "products" && (
                    <>
                        <div className={editingProductId ? "admin-login admin-edit-mode" : "admin-login"}>
                            <h2>
                                {editingProductId
                                    ? `Editing: ${productName}`
                                    : "Add Product"}
                            </h2>

                            <div className="input-counter-wrapper">

                                <input
                                    type="text"
                                    value={productName}
                                    maxLength={20}
                                    placeholder="Product Name"
                                    onChange={(e) => setProductName(e.target.value)}
                                    className={
                                        productName.length >= 20
                                            ? "input-limit-error"
                                            : ""
                                    }
                                />

                                <span className={`input-counter-inside ${
                                    productName.length >= 20 ? "limit-reached" : ""
                                }`}>
                                    {productName.length}/20
                                </span>

                            </div>

                            <input
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <div className="currency-toggle">
                                <button
                                    type="button"
                                    className={currency === "USD" ? "currency-option active" : "currency-option"}
                                    onClick={() => setCurrency("USD")}
                                >
                                    $ USD
                                </button>

                                <button
                                    type="button"
                                    className={currency === "UZS" ? "currency-option active" : "currency-option"}
                                    onClick={() => setCurrency("UZS")}
                                >
                                    So'm UZS
                                </button>
                            </div>

                            <textarea
                                placeholder="Description (optional)"
                                value={description}
                                maxLength={200}
                                onChange={(e) => setDescription(e.target.value)}
                                className={`admin-textarea ${
                                    description.length >= 200 ? "description-limit-error" : ""
                                }`}
                            />

                            <p className={`description-counter ${
                                description.length >= 200 ? "limit-reached" : ""
                            }`}>
                                {description.length}/200
                            </p>

                            <button
                                type="button"
                                className={newArrival ? "new-arrival-pill active" : "new-arrival-pill"}
                                onClick={() => setNewArrival(!newArrival)}
                            >
                                {newArrival ? "✓ Showing in New Arrivals" : "Show in New Arrivals"}
                            </button>

                            <CategorySelect
                                value={categoryId}
                                categories={adminCategories}
                                onChange={(id) => setCategoryId(id)}
                                placeholder="Select category"
                            />

                            <ImageUploader
                                label={imageUrl ? "Image ready ✅" : "Select Image"}
                                preview={imageUrl}
                                onImageReady={(file, previewUrl) => {
                                    setSelectedProductFile(file);
                                    setImageUrl(previewUrl);
                                }}
                            />

                            {imageUrl && (
                                <img
                                    src={selectedProductFile ? imageUrl : `http://localhost:8080${imageUrl}`}
                                    alt="Preview"
                                    className="admin-image-preview"
                                />
                            )}

                            <button
                                onClick={saveProduct}
                                disabled={
                                    !productName ||
                                    !price ||
                                    !categoryId ||
                                    loadingAction === "saveProduct"
                                }
                            >
                                {loadingAction === "saveProduct"
                                    ? "Saving..."
                                    : editingProductId
                                        ? "Update Product"
                                        : "Add Product"}
                            </button>

                            {editingProductId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        clearForm();
                                        setActivePage("products");
                                    }}
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>

                        <div className="admin-products">
                            <h2>Products</h2>

                            <CategorySelect
                                value={adminProductCategoryFilter}
                                categories={adminCategories}
                                onChange={(id) => {
                                    setAdminProductPage(0);
                                    loadProducts(id, 0);
                                }}
                                placeholder="All categories"
                                showAllOption={true}
                            />

                            {adminProducts.length === 0 ? (
                                <p className="empty-text">No products found</p>
                            ) : (
                                adminProducts.map((product) => (
                                    <div className="product-row-card" key={product.id}>
                                        <div className="product-row-left">
                                            {product.imageUrl ? (
                                                <img
                                                    src={`http://localhost:8080${product.imageUrl}`}
                                                    className="admin-product-image"
                                                    alt={product.name}
                                                />
                                            ) : (
                                                <div className="admin-avatar-placeholder">📦</div>
                                            )}

                                            <div className="product-row-info">
                                                <span className="product-name">{product.name}</span>
                                                <span className="product-category-badge">
                                                    {product.categoryName}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="product-price-badge">
                                            {formatPrice(product.price, product.currency)}
                                        </span>

                                        <div className="product-row-actions">
                                            <button className="edit-button" onClick={() => handleEdit(product)}>
                                                ✏️
                                            </button>

                                            <button className="delete-button" onClick={() => handleDelete(product)}>
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div className="pagination admin-pagination">
                                <button
                                    className="pagination-button"
                                    disabled={adminProductPage === 0}
                                    onClick={() =>
                                        loadProducts("", adminProductPage - 1)
                                    }
                                >
                                    ←
                                </button>
                                {Array.from({ length: adminProductTotalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        className={
                                            adminProductPage === index
                                                ? "pagination-button active"
                                                : "pagination-button"
                                        }
                                        onClick={() => loadProducts("", index)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    className="pagination-button"
                                    disabled={adminProductPage === adminProductTotalPages - 1}
                                    onClick={() =>
                                        loadProducts("", adminProductPage + 1)
                                    }
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {confirmOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Delete Admin</h3>

                            <p>
                                Enter password of <b>{deleteTarget?.username}</b> to confirm
                            </p>

                            <PasswordInput
                                placeholder="Enter password"
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                            />

                            <div className="modal-buttons">
                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setConfirmOpen(false);
                                        setDeletePassword("");
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="delete-btn"
                                    disabled={loadingAction === "deleteAdmin"}
                                    onClick={confirmDeleteAdmin}
                                >
                                    {loadingAction === "deleteAdmin" ? "Deleting..." : "Confirm Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {productDeleteConfirmOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Delete Product</h3>

                            <p>
                                Are you sure you want to delete{" "}
                                <b>{productDeleteTarget?.name}</b>?
                            </p>

                            <div className="modal-buttons">
                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setProductDeleteConfirmOpen(false);
                                        setProductDeleteTarget(null);
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="delete-btn"
                                    disabled={loadingAction === "deleteProduct"}
                                    onClick={confirmDeleteProduct}
                                >
                                    {loadingAction === "deleteProduct" ? "Deleting..." : "Yes, Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {confirmProfileOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Confirm Changes</h3>

                            <p>
                                {newPassword
                                    ? "You are changing password. Continue?"
                                    : "Update profile?"}
                            </p>

                            <div className="modal-buttons">
                                <button
                                    className="cancel-btn"
                                    onClick={() => setConfirmProfileOpen(false)}
                                >
                                    No
                                </button>

                                <button
                                    className="delete-btn"
                                    disabled={loadingAction === "updateProfile"}
                                    onClick={() => {
                                        setConfirmProfileOpen(false);
                                        updateProfile();
                                    }}
                                >
                                    {loadingAction === "updateProfile" ? "Saving..." : "Yes, Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {categoryDeleteConfirmOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Delete Category</h3>

                            <p>
                                Are you sure you want to delete{" "}
                                <b>{categoryDeleteTarget?.name}</b>?
                            </p>

                            <div className="modal-buttons">
                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setCategoryDeleteConfirmOpen(false);
                                        setCategoryDeleteTarget(null);
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="delete-btn"
                                    disabled={loadingAction === "deleteCategory"}
                                    onClick={confirmDeleteCategory}
                                >
                                    {loadingAction === "deleteCategory" ? "Deleting..." : "Yes, Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AdminPage;