import React, { useContext, useState } from 'react';
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
  Collapse,
  Button
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Menu } from 'react-feather';
import { Link as  RLink} from 'react-router-dom';


export default function NavbarWithExtensions() {
  const { brandsWithLetters, subCategories } = useContext(ProductContext);
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
      children: subCategories.map(categoryObj => ({
        label: categoryObj.category,
        href: `/categories/${categoryObj.category}`,
        subCategories: categoryObj.sub_categories.map(sub => ({
          label: sub,
          href: `/categories/${categoryObj.category}/${sub}`,
        })),
      })),
    },
    {
      label: 'BEST SELLERS',
      children: [
        { label: 'Cera Ve', href: '/brands/CeraVe' },
        { label: 'QRX', href: '/brands/QRX' },
      ],
    },
    {
      label: 'OFFERS',
      children: [
        { label: 'Limited Time Offers', href: '/limitedtimeoffer' },
      ],
    },
    {
      label: 'MORE',
      children: [
        { label: 'Our Founder', href: '/ourfounder' },
         { label: 'Who we are', href: '/whoweare' },
      ],
    },
  ];

  return (
    <Box>
      <Flex
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
        justify="space-between"
      >
        <Flex>
          {/* Add your logo or brand name here */}
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
          <DrawerHeader className='font-futuramedbold'>Menu</DrawerHeader>
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
      {navItems.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href || '#'}
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
                  {navItem.children.map(child => (
                    <Box key={child.label}>
                      <Popover trigger="hover" placement="right-start">
                        <PopoverTrigger>
                          <Link
                            href={child.href}
                            role={'group'}
                            display={'block'}
                            p={2}
                            rounded={'md'}
                            _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                            <Text
                              transition={'all .3s ease'}
                              _groupHover={{ color: 'pink.400' }}
                              fontWeight={500}
                              className='font-futura'>
                              {child.label.toUpperCase()}
                            </Text>
                          </Link>
                        </PopoverTrigger>
                        {child.subCategories && (
                          <PopoverContent
                            border={0}
                            boxShadow={'xl'}
                            bg={useColorModeValue('white', 'gray.800')}
                            p={4}
                            rounded={'xl'}
                            minW={'sm'}
                            maxH={'315px'}
                            overflowY={child.subCategories.length > 11 ? 'scroll' : 'auto'}>
                            <Stack>
                              {child.subCategories.map(sub => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  role={'group'}
                                  display={'block'}
                                  p={2}
                                  rounded={'md'}
                                  _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                                  <Text
                                    transition={'all .3s ease'}
                                    _groupHover={{ color: 'pink.400' }}
                                    fontWeight={500}
                                    className='font-futura'>
                                    {sub.label.toUpperCase()}
                                  </Text>
                                </Link>
                              ))}
                            </Stack>
                          </PopoverContent>
                        )}
                      </Popover>
                    </Box>
                  ))}
                  {navItem.moreLink && (
                    <Link
                      key="more"
                      href={navItem.moreLink}
                      role={'group'}
                      display={'block'}
                      p={2}
                      rounded={'md'}
                      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                      <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'brown.400' }}
                        fontWeight={500}
                        className='font-futurabold hover:text-brown-custom'>
                        All brands A-Z
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
  const [show, setShow] = useState({});
  const [showSub, setShowSub] = useState({});

  const handleToggle = (label) => {
    setShow((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const handleSubToggle = (label) => {
    setShowSub((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <VStack align="start" spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label} w="full">
          <Button onClick={() => handleToggle(navItem.label)} w="full" rounded='0' color= '#ffff'  _hover={{ bg: '#ffff' ,color: '#693F2D'}} _focus={{ bg: '#ffff' ,color: '#693F2D'}} bg= '#693F2D'justifyContent="flex-start" variant='solid' className='outline-none font-futuramedbold'>
            {navItem.label}
          </Button>
          <Collapse in={show[navItem.label]}>
            <Stack pl={4} spacing={2}>
              {navItem.children?.map((child) => (
                <Box key={child.label}>
                  {child.subCategories ? (
                    <>
                      <Button onClick={() => handleSubToggle(child.label)} w="full" rounded='0'  color= '#ffff'  _hover={{ bg: '#ffff' ,color: '#693F2D'}} _focus={{ bg: '#ffff' ,color: '#693F2D'}} bg= '#693F2D' justifyContent="flex-start" variant='solid' className='outline-none capitalize font-futuramedbold rounded-none mt-1'>
                        {child.label}
                      </Button>
                      <Collapse in={showSub[child.label]}>
                      <Stack pl={4} spacing={2} maxH="300px" overflowY={child.subCategories?.length > 11 ? 'scroll' : 'auto'}>
                    {child.subCategories
                      ?.sort((a, b) => a.label.localeCompare(b.label))
                      .map((sub) => (
                        <RLink key={sub.label} to={sub.href} onClick={onClose} h={9} className="group mt-1 text-center inline-flex w-full items-center font-futurabold justify-center rounded-none vp-bo px-6 py-2 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:text-white custom-hover  focus:ring-0 hover:outline-none hover:box-shadow-none" style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                          {sub.label}
                        </RLink>
                      ))}
                        </Stack>

                      </Collapse>
                    </>
                  ) : (
                    <RLink to={child.href} className="group mt-1 text-center inline-flex w-full items-center font-futurabold justify-center rounded-none vp-bo px-6 py-2 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:text-white custom-hover  focus:ring-0 hover:outline-none hover:box-shadow-none"style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                      {child.label}
                    </RLink>
                  )}
                </Box>
              ))}
              {navItem.moreLink && (
                <RLink to={navItem.moreLink} onClick={onClose} h={9} className="bg-gray-200 rounded-none hover:bg-brown-custom hover:text-white custom-link py-3" style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                  More Brands
                </RLink>
              )}
            </Stack>
          </Collapse>
        </Box>
      ))}
    </VStack>
  );
};
