// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { segmentAPI } from '@/services/api';
// import type { SegmentRule } from '@/types';

// interface AudiencePreviewProps {
//   rules: SegmentRule[];
// }

// export function AudiencePreview({ rules }: AudiencePreviewProps) {
//   const [audienceSize, setAudienceSize] = useState<number>(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (rules.length > 0 && rules.every(rule => rule.value !== '')) {
//       previewAudience();
//     } else {
//       setAudienceSize(0);
//     }
//   }, [rules]);

//   const previewAudience = async () => {
//     setLoading(true);
//     try {
//       const response = await segmentAPI.previewAudience(rules);
//       setAudienceSize(response.audienceSize);
//     } catch (error) {
//       console.error('Preview error:', error);
//       setAudienceSize(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isValidRules = rules.length > 0 && rules.every(rule => 
//     rule.field && rule.operator && rule.value !== ''
//   );

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Audience Preview</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="text-center">
//           {loading ? (
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//           ) : (
//             <>
//               <div className="text-3xl font-bold text-blue-600">
//                 {audienceSize.toLocaleString()}
//               </div>
//               <div className="text-sm text-gray-600 mt-1">
//                 {audienceSize === 1 ? 'customer' : 'customers'} match{audienceSize !== 1 ? '' : 'es'} your criteria
//               </div>
//             </>
//           )}
//         </div>
        
//         {!isValidRules && (
//           <div className="text-sm text-gray-500 mt-4 text-center">
//             Add segment rules to preview audience size
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePreviewAudience } from '@/hooks/useApi';
import type { SegmentRule } from '@/types';

interface AudiencePreviewProps {
  rules: SegmentRule[];
  onAudienceSizeChange?: (size: number) => void;
}

export function AudiencePreview({ rules, onAudienceSizeChange }: AudiencePreviewProps) {
  const [audienceSize, setAudienceSize] = useState<number>(0);
  const previewAudience = usePreviewAudience();

  useEffect(() => {
    if (rules.length > 0 && rules.every(rule => rule.value !== '')) {
      handlePreview();
    } else {
      setAudienceSize(0);
      onAudienceSizeChange?.(0);
    }
  }, [rules]);

  const handlePreview = async () => {
    try {
      const response = await previewAudience.mutateAsync(rules);
      const size = response.data?.audienceSize || 0;
      setAudienceSize(size);
      onAudienceSizeChange?.(size);
    } catch (error) {
      console.error('Preview error:', error);
      setAudienceSize(0);
      onAudienceSizeChange?.(0);
    }
  };

  const isValidRules = rules.length > 0 && rules.every(rule => 
    rule.field && rule.operator && rule.value !== ''
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          {previewAudience.isPending ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          ) : (
            <>
              <div className="text-3xl font-bold text-blue-600">
                {audienceSize.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {audienceSize === 1 ? 'customer matches' : 'customers match'} your criteria
              </div>
            </>
          )}
        </div>
        
        {!isValidRules && (
          <div className="text-sm text-gray-500 mt-4 text-center">
            Add segment rules to preview audience size
          </div>
        )}
      </CardContent>
    </Card>
  );
}