import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { ProductContext } from '../context/ProductContext';

export default function PromoCode() {

    const {apiEndpoint} = useContext(ProductContext) 
    const [promoCode, setPromoCode] = useState('');
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoSubmitted, setPromoSubmitted] = useState(false);
    const [promoError, setPromoError] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0);

    const handlePromoCodeChange = (e) => setPromoCode(e.target.value);

    const isPromoCodeError = promoSubmitted && promoCode.trim() === '';


    const handleSubmit = async (e) => {
        e.preventDefault();
        setPromoSubmitted(true)
        setPromoLoading(true);
        if (promoCode !== '') {
            try {
                const response = await fetch(`${apiEndpoint}/discount/validate/${promoCode}`);
                const result = await response.json();
                if (response.ok) {
                    setPromoApplied(true);
                    setDiscountPercentage(result.discount_percentage);
                    setPromoError('')
                } else {
                    setPromoError(result.error);
                }
            } catch (error) {
                setPromoError('Invalid promo code. Please try again.');
            } finally {
                setPromoLoading(false);
            }
        } else {
            setPromoLoading(false);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} mt={4}>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <Input
                    type="text"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    placeholder="Enter promo code"
                    w="2/3"
                    border="1px"
                    borderRadius="md"
                    p={2}
                />
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    ml={2}
                    py={2}
                    px={4}
                    fontWeight="bold"
                    borderRadius="md"
                    bg={promoApplied ? 'gray.400' : 'blue.500'}
                    _hover={{ bg: promoApplied ? 'gray.400' : 'blue.700' }}
                    color="white"
                    disabled={promoApplied}
                >
                    {promoLoading ? <Spinner size="sm" /> : promoApplied ? 'Applied' : 'Apply'}
                </Button>
            </FormControl>
            {promoError && (
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>Error!</AlertTitle>
                    <AlertDescription>{promoError}</AlertDescription>
                </Alert>
            )}
             {isPromoCodeError && <p className="text-red-500 font-futurabold text-sm">Promocode is required.</p>}
             {promoApplied && <p className="text-green-500 font-futurabold text-sm">Promocode accepted.</p>}
        </Box>
    );
}
