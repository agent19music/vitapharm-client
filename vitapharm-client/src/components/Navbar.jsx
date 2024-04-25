import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function NavbarWithExtensions() {
  // Define the nav items and their sub-items here
  const NAV_ITEMS = [
    {
      label: 'Brands',
      children: [
        {
          label: 'Brand A',
          href: '#',
        },
        {
          label: 'Brand B',
          href: '#',
        },
        // More brands...
      ],
    },
    {
      label: 'Category',
      children: [
        {
          label: 'Action',
          href: '#',
        },
        {
          label: 'Romance',
          href: '#',
        },
        {
          label: 'Drama',
          href: '#',
        },
        // More categories...
      ],
    },
    {
      label: 'Skin Type',
      children: [
        {
          label: 'Oily',
          href: '#',
        },
        {
          label: 'Dry',
          href: '#',
        },
        {
          label: 'Combination',
          href: '#',
        },
        // More skin types...
      ],
    },
    // More nav items...
  ];

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useColorModeValue('start', 'center')}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            My App
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav navItems={NAV_ITEMS} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

const DesktopNav = ({ navItems }) => {
  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={'#'}
                fontSize={'sm'}
                fontWeight={500}
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
                      <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
                        {child.label}
                      </Text>
                    </Link>
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
