import { useEffect, useState } from "react";
import { getAllProducts, searchProducts, getCategories, getProductsByCategory } from "../api/ProductsApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function MyProducts({addToCart}) {
    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    // pagination start 
    const [currentpage, setCurrentpage] = useState(1);
    const itemsPerPage = 10;
    const start = (currentpage - 1) * itemsPerPage;
    const paginatedData = products.slice(start, start + itemsPerPage);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // pagination end
    useEffect(() => {
        loadInitialData();
    }, []);

    async function loadInitialData() {
        try {
            setLoading(true);
            setError("");

            const [productRes, categoriesRes] = await Promise.all([
                getAllProducts(),
                getCategories(),
            ]);

            setProduct(productRes.products || []);
            setCategories(categoriesRes || []);
        } catch (err) {
            setError(err.message || "Failed to load products")
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(e) {

        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            if (!searchText.trim()) {
                const data = await getAllProducts();
                setProduct(data.products || []);
            } else {
                const data = await searchProducts(searchText);
                setProduct(data.products || []);
            }
            setCurrentpage(1);
        }
        catch (err) {
            setError(err.message || "Search failed");
        } finally {
            setLoading(false);
        }
    }

    async function handleCategoryChange(e) {
        const category = e.target.value;
        setSelectedCategory(category);

        try {
            setLoading(true);
            setError("");

            if (!category) {
                const data = await getAllProducts();
                setProduct(data.products || []);
            } else {
                const data = await getProductsByCategory(category);
                setProduct(data.products || []);
            }
            setCurrentpage(1);
        } catch (err) {
            setError(err.message || "Category fetch failed");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />

    return (
        <>
            <div style={{ padding: "20px" }}>
                <h1>Products</h1>
                <form onSubmit={handleSearch} style={{ marginBottom: "16px" }}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ padding: "8px", marginRight: "8px", width: "240px" }}
                    />
                    <button type="submit">Search</button>
                </form>
                <div style={{ marginBottom: "16px" }}>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value={""}>
                            All Categories
                        </option>
                        {
                            categories.map((category) => {
                                const value = typeof category === "string" ? category : category.slug;
                                const label = typeof category === "string" ? category : category.name;
                                return (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <button disabled={currentpage == 1} onClick={() => setCurrentpage((prev) => prev - 1)}>Prev</button>
                    <span style={{ padding: "10px" }}>  Page {currentpage} of {totalPages}</span>
                    <button disabled={currentpage == totalPages} onClick={() => setCurrentpage((prev) => prev + 1)}>Next</button>
                </div>
                {paginatedData.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "16px"
                        }}
                    >
                        {paginatedData.map((product) => (<ProductCard key={product.id} product={product} addToCart= {addToCart} />))}
                    </div>
                )}
            </div>

        </>

    )
}

export default MyProducts;