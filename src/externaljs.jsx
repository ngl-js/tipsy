import React from 'react';

const Externaljs = ({children}) => {
  return (
    <script defer>
      {children}
    </script>
  );
}

export default Externaljs;
