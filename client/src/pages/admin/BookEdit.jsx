import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Upload } from 'lucide-react';

const BookEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Fiction');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [popular, setPopular] = useState(false);

    // Keeping these for compatibility with backend model even if not in UI explicitly
    const [author, setAuthor] = useState('Unknown');
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
                const { data } = await axios.get(`/api/books/${id}`);
                setTitle(data.title);
                setDescription(data.description);
                setCategory(data.genre); // Assuming genre maps to category
                setPrice(data.price);
                setImage(data.image);
                setPopular(data.popular || false); // Assuming popular field exists
                setAuthor(data.author);
                setCountInStock(data.countInStock);
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
        try {
            const bookData = {
                title,
                description,
                genre: category,
                price,
                image,
                popular,
                author,
                countInStock
            };

            if (isNew) {
                await axios.post('/api/books', bookData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            } else {
                await axios.put(`/api/books/${id}`, bookData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            }

            setLoadingUpdate(false);
            // Show success message or toast here if needed
            navigate('/admin/booklist');
        } catch (error) {
            alert(error.response?.data?.message || error.message);
            setLoadingUpdate(false);
        }
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="admin-form-container">
            <form onSubmit={submitHandler}>
                <div className="admin-form-group">
                    <label className="admin-label">Product Name</label>
                    <input
                        type="text"
                        className="admin-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Type here"
                        required
                    />
                </div>

                <div className="admin-form-group">
                    <label className="admin-label">Product Description</label>
                    <textarea
                        className="admin-textarea"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Type here"
                        required
                    ></textarea>
                </div>

                <div className="admin-form-group" style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ flex: 1 }}>
                        <label className="admin-label">Category</label>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <select
                                className="admin-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Fiction">Fiction</option>
                                <option value="Children">Children</option>
                                <option value="Health">Health</option>
                                <option value="Academic">Academic</option>
                                <option value="Business">Business</option>
                                <option value="Religious">Religious</option>
                            </select>

                            {/* Simple Image URL input for now, acting as the image upload/preview area */}
                            <div className="image-upload-container">
                                <div className="image-preview" onClick={() => document.getElementById('image-file').click()} style={{ cursor: 'pointer' }}>
                                    {image ? (
                                        <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }} />
                                    ) : (
                                        <Upload size={24} />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="image-file"
                                    onChange={uploadFileHandler}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '0.5rem' }}>
                            <input
                                type="text"
                                className="admin-input"
                                placeholder="Image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <label className="admin-label">Price</label>
                        <input
                            type="number"
                            className="admin-input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="admin-form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={popular}
                            onChange={(e) => setPopular(e.target.checked)}
                        />
                        <span>Add to popular</span>
                    </label>
                </div>

                <button type="submit" className="admin-btn-primary">
                    {loadingUpdate ? 'Saving...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default BookEdit;
