import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';


const HomeScreen = () => {
    const [products, setproducts] = useState([]);

    useEffect(() => {

        console.log("second-------");
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setproducts(data);
        };
        fetchProducts();
    }, []);

    console.log("first-------");
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen