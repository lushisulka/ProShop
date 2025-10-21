import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
    const { pageNumber } = useParams();

    const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

    const products = data?.products || [];

    return (
        <>
            <h1>Latest Products</h1>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error || 'Something went wrong'}
                </Message>
            ) : products.length === 0 ? (
                <Message>No products found</Message>
            ) : (
                <>
                    <Row>
                        {data.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={data.pages} page={data.page} 
                    />
                </>
            )}

        </>
    );
};

export default HomeScreen;
