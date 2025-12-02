import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload } from 'lucide-react';

const BookEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const { user } = useContext(AuthContext); // Removed incorrect usage

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Fiction');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [popular, setPopular] = useState(false);

    // Keeping these for compatibility with backend model even if not in UI explicitly
    const [author, setAuthor] = useState('');
    const [countInStock, setCountInStock] = useState(10);

    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const isNew = !id || id === 'new';

    useEffect(() => {
        if (isNew) {
            setLoading(false);
            return;
        }

        const fetchBook = async () => {
            try {
                const { data } = await axios.get(`/api/user/book/${id}`);
                setTitle(data.title);
                setDescription(data.description);
                setCategory(data.genre); // Assuming genre maps to category
                setPrice(data.price);
                setImage(data.image || data.itemImage);
                setPopular(data.isPopular || false);
                setAuthor(data.author);
                setCountInStock(data.countInStock || 0);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchBook();
    }, [id, isNew]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setLoadingUpdate(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
            setLoadingUpdate(false);
        } catch (error) {
            console.error(error);
            setLoadingUpdate(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);

        const sellerInfo = JSON.parse(localStorage.getItem('sellerInfo'));
        if (!sellerInfo) {
            alert('Please login as a seller');
            navigate('/seller/login');
            return;
        }

        try {
            const bookData = {
                title,
                description,
                genre: category,
                price,
                itemImage: image, // Backend expects itemImage
                isPopular: popular,
                author,
                countInStock
            };

            const config = {
                headers: { Authorization: `Bearer ${sellerInfo.token}` },
            };

            if (isNew) {
                await axios.post('/api/seller/add-book', bookData, config);
            } else {
                await axios.put(`/api/seller/update-book/${id}`, bookData, config);
            }

            setLoadingUpdate(false);
            // Show success message or toast here if needed
            navigate('/seller/products'); // Redirect to My Products instead of admin booklist
        } catch (error) {
            alert(error.response?.data?.message || error.message);
            setLoadingUpdate(false);
        }
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
            <div className="container">
                <div className="auth-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="section-header" style={{ marginBottom: '2rem' }}>
                        <h2>{isNew ? 'Add New Book' : 'Edit Book'}</h2>
                        <p className="text-light">Fill in the details below to list your book</p>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter book title"
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Author Name</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        placeholder="Enter author name"
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Product Description</label>
                            <textarea
                                className="form-control"
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the book..."
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                            ></textarea>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    className="form-control"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', backgroundColor: 'white' }}
                                >
                                    <option value="Fiction">Fiction</option>
                                    <option value="Children">Children</option>
                                    <option value="Health">Health</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Business">Business</option>
                                    <option value="Religious">Religious</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Price ($)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Count In Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                    required
                                    min="0"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Book Cover Image</label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div
                                    className="image-preview"
                                    onClick={() => document.getElementById('image-file').click()}
                                    style={{
                                        width: '120px',
                                        height: '160px',
                                        border: '2px dashed var(--border)',
                                        borderRadius: '0.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        backgroundColor: '#f8fafc'
                                    }}
                                >
                                    {image ? (
                                        <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                                            <Upload size={24} />
                                            <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '0.5rem' }}>Upload</span>
                                        </div>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Or enter image URL"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', marginBottom: '0.5rem' }}
                                    />
                                    <input
                                        type="file"
                                        id="image-file"
                                        onChange={uploadFileHandler}
                                        style={{ display: 'none' }}
                                    />
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                                        Click the box to upload or paste a URL.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                id="popular"
                                checked={popular}
                                onChange={(e) => setPopular(e.target.checked)}
                                style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                            <label htmlFor="popular" style={{ margin: 0, cursor: 'pointer' }}>Mark as Popular Book</label>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                            {loadingUpdate ? 'Saving...' : (isNew ? 'Add Book' : 'Update Book')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookEdit;
