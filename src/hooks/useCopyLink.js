
import  { useState } from 'react'

export const useCopyLink = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Mostrar mensaje por 2 segundos
      };


  return {copied, handleCopy}
}
