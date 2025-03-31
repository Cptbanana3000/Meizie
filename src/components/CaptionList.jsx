import { useState } from 'react';
import { 
  VStack, Box, Text, Button, useToast, 
  Divider, HStack, Spinner, Flex, Heading,
  Badge
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';

export default function CaptionList({ captions, loading, onRegenerate }) {
  const toast = useToast();
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(index);
        toast({
          title: "Caption copied!",
          description: "The caption has been copied to your clipboard.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "There was an error copying to your clipboard.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  if (loading) {
    return (
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        p={8} 
        minH="300px"
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
      >
        <Spinner 
          size="xl" 
          color="brand.500" 
          thickness="3px" 
          speed="0.8s"
          mb={6}
        />
        <Heading size="md" color="gray.700" mb={2}>
          Meizie AI is working...
        </Heading>
        <Text fontSize="md" color="gray.500">
          Creating high-converting captions just for you
        </Text>
        <Text fontSize="sm" color="gray.400" mt={2}>
          This usually takes a few seconds
        </Text>
      </Flex>
    );
  }

  if (!captions || captions.length === 0) {
    return (
      <Box 
        p={6} 
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        minH="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box 
          bg="gray.50" 
          p={6} 
          borderRadius="md"
          textAlign="center"
          w="100%"
        >
          <Heading size="md" color="gray.600" mb={3}>
            Your AI-Generated Captions
          </Heading>
          <Text fontSize="md" color="gray.500">
            Fill out the form and click "Generate My Captions" to create engaging product descriptions.
          </Text>
          <Text fontSize="sm" mt={4} color="brand.500" fontWeight="medium">
            3 free generations available
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch" w="100%" p={6} bg="white" borderRadius="lg" boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Heading size="md" color="brand.500">
          Your AI-Generated Captions
        </Heading>
        <Badge colorScheme="green" p={1} borderRadius="md">
          {captions.length} captions
        </Badge>
      </Flex>
      
      <Divider />
      
      {captions.map((caption, index) => (
        <Box 
          key={index} 
          p={4} 
          bg={copied === index ? "green.50" : "gray.50"} 
          borderRadius="md" 
          borderLeft="4px solid"
          borderLeftColor={copied === index ? "green.400" : "brand.400"}
          boxShadow="sm"
          position="relative"
          _hover={{ 
            boxShadow: "md",
            bg: copied === index ? "green.50" : "gray.100" 
          }}
          transition="all 0.2s"
        >
          <Text whiteSpace="pre-wrap">{caption}</Text>
          
          <Button
            size="sm"
            position="absolute"
            top="8px"
            right="8px"
            onClick={() => handleCopy(caption, index)}
            colorScheme={copied === index ? "green" : "gray"}
            variant="ghost"
            leftIcon={copied === index ? <CheckIcon /> : <CopyIcon />}
          >
            {copied === index ? "Copied" : "Copy"}
          </Button>
        </Box>
      ))}
      
      <HStack spacing={4} justify="center" mt={4}>
        <Button 
          colorScheme="brand" 
          onClick={onRegenerate}
          isDisabled={loading}
          boxShadow="sm"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'md',
          }}
          transition="all 0.2s"
        >
          Generate More Variations
        </Button>
      </HStack>
    </VStack>
  );
} 