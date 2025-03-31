import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Heading,
  Image,
  Flex,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container as={Stack} maxW={'container.xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack spacing={6}>
            <Flex align="center">
              <Heading
                textAlign={useColorModeValue('left', 'center')}
                fontFamily={'heading'}
                color={useColorModeValue('brand.600', 'white')}
                fontSize="xl"
              >
                Meizie
              </Heading>
              <Text color="accent.500" fontSize="lg" fontWeight="bold" ml={2}>
                AI
              </Text>
            </Flex>
            <Text fontSize={'sm'}>
              AI-powered captions that convert shoppers into buyers
            </Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'https://twitter.com/meizieai'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'LinkedIn'} href={'https://linkedin.com/company/meizie'}>
                <FaLinkedin />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'https://instagram.com/meizieai'}>
                <FaInstagram />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'https://youtube.com/c/meizieai'}>
                <FaYoutube />
              </SocialButton>
            </Stack>
          </Stack>
          
          <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Link href={'#'}>Overview</Link>
            <Link href={'#'}>Features</Link>
            <Link href={'#'}>Pricing</Link>
            <Link href={'#'}>Case Studies</Link>
            <Link href={'#'}>Testimonials</Link>
          </Stack>
          
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>Careers</Link>
            <Link href={'#'}>Contact</Link>
            <Link href={'#'}>Partners</Link>
          </Stack>
          
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>API Status</Link>
            <Link href={'#'}>Cookie Settings</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'container.xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text fontSize="sm">© {new Date().getFullYear()} Meizie AI. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <Text fontSize="sm">Made with 💜 for e-commerce marketers</Text>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
} 