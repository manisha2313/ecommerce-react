import { useState } from "react";
import { getProducts, getCategories } from "../api/ProductsApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
function MyProducts({ addToCart }) {
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [page, setPage] = useState(1);
    const limit = 12;

    const { data: productsData, isPending, isError, error, isFetching } = useQuery({
        queryKey: ["products", { page, limit, search: searchText, category: selectedCategory }],
        queryFn: () => getProducts({ page, limit, search: searchText, category: selectedCategory }),
        placeholderData: keepPreviousData,
    });
    const { data: categories, isPending: categoriesLoading, isError: categoriesError, error: categoriesErrorObj } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });


    // async function loadInitialData() {
    //     try {
    //         setLoading(true);
    //         setError("");

    //         const [productRes, categoriesRes] = await Promise.all([
    //             getAllProducts(),
    //             getCategories(),
    //         ]);

    //         setProduct(productRes.products || []);
    //         setCategories(categoriesRes || []);
    //     } catch (err) {
    //         setError(err.message || "Failed to load products")
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // async function handleSearch(e) {

    //     e.preventDefault();

    //     try {
    //         setLoading(true);
    //         setError("");

    //         if (!searchText.trim()) {
    //             const data = await getAllProducts();
    //             setProduct(data.products || []);
    //         } else {
    //             const data = await searchProducts(searchText);
    //             setProduct(data.products || []);
    //         }
    //         setCurrentpage(1);
    //     }
    //     catch (err) {
    //         setError(err.message || "Search failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // async function handleCategoryChange(e) {
    //     const category = e.target.value;
    //     setSelectedCategory(category);

    //     try {
    //         setLoading(true);
    //         setError("");

    //         if (!category) {
    //             const data = await getAllProducts();
    //             setProduct(data.products || []);
    //         } else {
    //             const data = await getProductsByCategory(category);
    //             setProduct(data.products || []);
    //         }
    //         setCurrentpage(1);
    //     } catch (err) {
    //         setError(err.message || "Category fetch failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    if (isPending && !productsData) return <Loader />;
    if (isError) return <ErrorMessage message={error.message} />
    if (categoriesError) {
        return <ErrorMessage message={categoriesErrorObj.message} />
    }

    const products = productsData?.products || [];
    const total = productsData.total || 0;
    const totalPages = Math.ceil(total / limit);

    function handleSearch(e) {
        e.preventDefault();
        setPage(1);
    }
    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
        setPage(1);
    }
    return (
        <>
            <div style={{ padding: "20px" }}>
                <h1>Products</h1>
                <form onSubmit={handleSearch} style={{ marginBottom: "16px" }}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={(e) => { setSearchText(e.target.value); setPage(1) }}
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
                            !categoriesLoading && categories.map((category) => {
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
                    <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
                    <span style={{ padding: "10px" }}>    Page {page} of {totalPages || 1}</span>
                    <button disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)}>Next</button>
                </div>
                {isFetching && <p>Updating...</p>}

                {products.length === 0 ? (
                    <p>No products found</p>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "16px",
                        }}
                    >
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                addToCart={addToCart}
                            />
                        ))}
                    </div>
                )}

            </div>

        </>

    )
}

export default MyProducts;