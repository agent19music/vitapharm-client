import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import {
  Box,
  Flex,
  Text,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';

export default function NavbarWithExtensions() {
  const { brandsWithLetters, categories } = useContext(ProductContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NAV_ITEMS = [
    {
      label: 'BRANDS',
      children: brandsWithLetters.slice(0, 5).map(brand => ({
        label: brand.name,
        href: `/brands/${brand.name}`,
      })),
      moreLink: '/brands',
    },
    {
      label: 'CATEGORY',
      children: categories.map(category => ({
        label: category,
        href: `/categories/${category}`,
      })),
    },
    {
      label: 'SKIN TYPE',
      children: [
        { label: 'Oily', href: '#' },
        { label: 'Dry', href: '#' },
        { label: 'Combination', href: '#' },
      ],
    },
    {
      label: 'BEST SELLERS',
      children: [
        { label: 'Cera Ve', href: '#' },
        { label: 'QRX', href: '#' },
        { label: 'Fenty', href: '#' },
      ],
    },
    {
      label: 'OFFERS',
      children: [
        { label: 'Discounts', href: '#' },
        { label: 'Promotions', href: '#' },
        { label: 'Limited Time Offers', href: '#' },
      ],
    },
  ];

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
        justify="space-between"
        className="shadow-md"
      >
        <Flex>
          
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <DesktopNav navItems={NAV_ITEMS} />
        </Flex>
        <Flex display={{ base: 'flex', md: 'none' }}>
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <MobileNav navItems={NAV_ITEMS} onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

const DesktopNav = ({ navItems }) => {
  return (
    <Stack direction="row" spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={2}
                href={'#'}
                fontSize={'md'}
                fontWeight={500}
                className='font-futurabold'
                color={useColorModeValue('gray.600', 'gray.200')}
                _hover={{
                  textDecoration: 'none',
                  color: useColorModeValue('gray.800', 'white'),
                }}>
                {navItem.label}
                <ChevronDownIcon />
              </Link>
            </PopoverTrigger>

            {navItem.children && (
                <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={useColorModeValue('white', 'gray.800')}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                      <Link key={child.label} href={child.href} role={'group'} display={'block'} p={2} rounded={'md'} _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                      <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500} className='font-futura'>
                        {child.label.toUpperCase()} 
                      </Text>
                    </Link>
                  ))}
                  {navItem.moreLink && (
                       <Link key="more" href={navItem.moreLink} role={'group'} display={'block'} p={2} rounded={'md'} _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                       <Text transition={'all .3s ease'} _groupHover={{ color: 'brown.400' }} fontWeight={500} className='font-futurabold'>
                         More Brands
                       </Text>
                     </Link>
                   )}
                 </Stack>
               </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
const MobileNav = ({ navItems, onClose }) => {
  return (
    <VStack align="start" className="space-y-4">
      {navItems.map((navItem) => (
        <Box key={navItem.label} className="w-full">
          <details className="group">
            <summary className="font-bold mb-2 cursor-pointer list-none">
              <Text className="group-hover:text-pink-400">{navItem.label}</Text>
            </summary>
            {navItem.children && (
              <Stack pl={4} className="space-y-2">
                {navItem.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={onClose}
                    height={9}
                    className="bg-zinc-100 rounded-md hover:bg-brown-custom hover:text-white custom-link"
                  >
                    {child.label}
                  </Link>
                ))}
                {navItem.moreLink && (
                  <Link
                    key="more"
                    href={navItem.moreLink}
                    height={9}
                    onClick={onClose}
                    className="bg-zinc-100 rounded-md hover:bg-brown-custom hover:text-white custom-link"
                  >
                    More Brands
                  </Link>
                )}
              </Stack>
            )}
          </details>
        </Box>
      ))}
    </VStack>
  );
};
