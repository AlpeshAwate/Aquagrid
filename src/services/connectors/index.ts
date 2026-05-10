import ecmwfConnector from './ecmwf'
import googleConnector from './google'
import nasaConnector from './nasa'

export const groundwaterConnectors = [nasaConnector, ecmwfConnector, googleConnector]
