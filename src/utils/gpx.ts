export function generateGpxContent(stageName: string, points: Array<{lat: number; lng: number; ele: number}>): string {
  const trackpoints = points.map(p =>
    `      <trkpt lat="${p.lat}" lon="${p.lng}"><ele>${p.ele}</ele></trkpt>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1" creator="CamminoSanBenedettoApp">
  <metadata>
    <name>${stageName}</name>
    <desc>Cammino di San Benedetto - ${stageName}</desc>
  </metadata>
  <trk>
    <name>${stageName}</name>
    <trkseg>
${trackpoints}
    </trkseg>
  </trk>
</gpx>`;
}

export function downloadGpx(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
