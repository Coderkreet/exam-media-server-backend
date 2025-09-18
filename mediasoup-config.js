module.exports = {
  workerSettings: {
    rtcMinPort: process.env.RTC_MIN_PORT || 10000,
    rtcMaxPort: process.env.RTC_MAX_PORT || 10100,
    logLevel: process.env.MEDIASOUP_LOG_LEVEL || 'warn',
    logTags: [
      'info',
      'ice',
      'dtls',
      'rtp',
      'srtp',
      'rtcp'
    ]
  },
  
  routerOptions: {
    mediaCodecs: [
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2
      },
      {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
          'x-google-start-bitrate': 1000
        }
      },
      {
        kind: 'video',
        mimeType: 'video/VP9',
        clockRate: 90000,
        parameters: {
          'profile-id': 2,
          'x-google-start-bitrate': 1000
        }
      },
      {
        kind: 'video',
        mimeType: 'video/h264',
        clockRate: 90000,
        parameters: {
          'packetization-mode': 1,
          'profile-level-id': '4d0032',
          'level-asymmetry-allowed': 1,
          'x-google-start-bitrate': 1000
        }
      }
    ]
  },
  
  webRtcTransportOptions: {
    listenIps: [
      {
        ip: '0.0.0.0',
        // ✅ FIXED: Railway public domain detection
        announcedIp: process.env.RAILWAY_STATIC_URL ? 
          process.env.RAILWAY_STATIC_URL.replace('https://', '') : 
          process.env.RAILWAY_PUBLIC_DOMAIN || 
          undefined
      }
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    // ✅ Optimized for Railway bandwidth limits
    maxIncomingBitrate: 1500000,
    initialAvailableOutgoingBitrate: 1000000,
    minimumAvailableOutgoingBitrate: 600000,
    maxSctpMessageSize: 262144,
    sctpSendBufferSize: 262144,
    // ✅ Enhanced metadata
    appData: {
      platform: 'railway',
      env: process.env.NODE_ENV || 'development',
      deployment: 'vercel-railway',
      timestamp: new Date().toISOString()
    }
  }
};
