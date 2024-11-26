const areaSchema = {
  '🇭🇰 香港节点': { reg: /^(?!.*游戏).*(香港|🇭🇰|HongKong|HK)+(.*)$/ },
  '🇨🇳 台湾节点': { reg: /^(?!.*游戏).*(台湾|🇨🇳|Taiwan|TW)+(.*)$/ },
  '🇯🇵 日本节点': { reg: /^(?!.*游戏).*(日本|🇯🇵|Japan|JP|东京)+(.*)$/ },
  '🇸🇬 新加坡节点': { reg: /^(?!.*游戏).*(新加坡|🇸🇬|Singapore|SG|狮城)+(.*)$/ },
  '🇰🇷 韩国节点': { reg: /^(?!.*游戏).*(韩国|🇰🇷|Korea|Kr)+(.*)/ },
  '🇺🇲 美国节点': { reg: /^(?!.*游戏).*(美国|🇺🇸|American|US)+(.*)$/ },
  '🏳️‍🌈 其他地区': { reg: /^(?!.*游戏).*/ }
}
const customSchema = {
  '⬇️ 低倍节点': { reg: /(?<![0-9])0\.[0-9]+|低倍/ },
  '💬 人工智能': { reg: /^(?!.*游戏).*(ai|gpt)+(.*)/i }
}

const ruleProviders = {
  Apple: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple.yaml',
    format: 'yaml',
    path: './ruleset/Apple.yaml',
    interval: 86400
  },
  AppleDomain: {
    type: 'http',
    behavior: 'domain',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple_Domain.yaml',
    format: 'yaml',
    path: './ruleset/Apple_Domain.yaml',
    interval: 86400
  },
  Microsoft: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft.yaml',
    format: 'yaml',
    path: './ruleset/Microsoft.yaml',
    interval: 86400
  },
  Game: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Game/Game.yaml',
    format: 'yaml',
    path: './ruleset/Game.yaml',
    interval: 86400
  },
  Download: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Download/Download.yaml',
    format: 'yaml',
    path: './ruleset/Download.yaml',
    interval: 86400
  },
  OpenAI: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/ericz15/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml',
    format: 'yaml',
    path: './ruleset/OpenAI.yaml',
    interval: 86400
  },
  Claude: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml',
    format: 'yaml',
    path: './ruleset/Claude.yaml',
    interval: 86400
  },
  Google: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Google/Google.yaml',
    format: 'yaml',
    path: './ruleset/Google.yaml',
    interval: 86400
  },
  YouTube: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml',
    format: 'yaml',
    path: './ruleset/YouTube.yaml',
    interval: 86400
  },
  YouTubeMusic: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTubeMusic/YouTubeMusic.yaml',
    format: 'yaml',
    path: './ruleset/YouTubeMusic.yaml',
    interval: 86400
  },
  Telegram: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/ericz15/ios_rule_script/master/rule/Clash/Telegram/Telegram.yaml',
    format: 'yaml',
    path: './ruleset/Telegram.yaml',
    interval: 86400
  },
  GFW: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ProxyLite/ProxyLite.yaml',
    path: './ruleset/ProxyLite.yaml',
    interval: 86400
  },
  China: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMax/ChinaMax.yaml',
    format: 'yaml',
    interval: 86400,
    path: './ruleset/ChinaMax.yaml'
  },
  ChinaDomain: {
    type: 'http',
    behavior: 'domain',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMax/ChinaMax_Domain.yaml',
    format: 'yaml',
    interval: 86400,
    path: './ruleset/ChinaMax_Domain.yaml'
  },
  Lan: {
    type: 'http',
    behavior: 'classical',
    url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Lan/Lan.yaml',
    format: 'yaml',
    path: './ruleset/Lan.yaml',
    interval: 86400
  }
}
const rules = [
  'DOMAIN-SUFFIX,deb.debian.org,⬇️ 低倍节点',
  'DOMAIN-SUFFIX,dl.google.com,⬇️ 低倍节点',
  'DOMAIN-SUFFIX,storage.googleapis.com,⬇️ 低倍节点',
  'DOMAIN-SUFFIX,production.cloudflare.docker.com,⬇️ 低倍节点',
  'DOMAIN-SUFFIX,download-cdn.jetbrains.com,⬇️ 低倍节点',
  'DOMAIN-SUFFIX,bard.google.com,💬 人工智能',
  'RULE-SET,OpenAI,💬 人工智能',
  'RULE-SET,Claude,💬 人工智能',
  // 'RULE-SET,Download,⬇️ 低倍节点',
  // 'RULE-SET,Game,🎮 游戏平台',
  // 'RULE-SET,Apple,DIRECT',
  // 'RULE-SET,AppleDomain,DIRECT',
  // 'RULE-SET,Microsoft,DIRECT',
  // 'RULE-SET,Google,🚀 节点选择',
  // 'RULE-SET,YouTube,🚀 节点选择',
  // 'RULE-SET,YouTubeMusic,🚀 节点选择',
  // 'RULE-SET,Telegram,🚀 节点选择',
  // 'RULE-SET,GFW,🚀 节点选择',
  // 'RULE-SET,China,DIRECT',
  // 'RULE-SET,ChinaDomain,DIRECT',
  // 'RULE-SET,Lan,DIRECT',
  // 'GEOIP,CN,DIRECT,no-resolve',
  'MATCH,🐟 漏网之鱼'
]

const dns = {
  enable: true,
  ipv6: true,
  'use-hosts': true,
  'enhanced-mode': 'fake-ip',
  'fake-ip-range': '198.18.0.1/16',
  'fake-ip-filter': [
    '*.lan',
    '*.localdomain',
    '*.localhost',
    '*.test',
    '*.local'
  ],
  'default-nameserver': [
    '119.29.29.29',
    '223.5.5.5',
    '101.101.101.101'
  ],
  nameserver: [
    'https://doh.pub/dns-query',
    'https://dns.alidns.com/dns-query',
    'https://1.12.12.12/dns-query',
    'https://120.53.53.53/dns-query',
    'https://223.6.6.6/dns-query'
  ],
  fallback: [
    'https://dns.twnic.tw/dns-query',
    'https://doh.dns.sb/dns-query',
    'https://dns.cloudflare.com/dns-query',
    'https://dns.google/dns-query',
    'https://dns.quad9.net/dns-query'
  ],
  'fallback-filter': {
    geoip: true,
    'geoip-code': 'CN',
    ipcidr: ['240.0.0.0/4', '0.0.0.0/32']
  }
}

function schemaParse(
  proxies,
  scheme,
  options = { skip: true, target: 'array' }
) {
  let proxyGroups = Object.entries(scheme).map(([name, item]) => {
    return {
      name,
      regExp: item.reg,
      type: item.type || 'url-test',
      url: 'http://www.gstatic.com/generate_204',
      interval: 300,
      tolerance: 50,
      proxies: []
    }
  })

  proxies.forEach(proxy => {
    for (let item of proxyGroups) {
      if (item.regExp.test(proxy.name)) {
        item.proxies.push(proxy.name)
        if (options.skip) break
      }
    }
  })

  proxyGroups = proxyGroups.filter(item => {
    delete item.regExp
    return item.proxies.length > 0
  })

  return options.target === 'array'
    ? proxyGroups
    : proxyGroups.reduce((res, item) => {
      res[item.name] = item
      return res
    }, {})
}

async function main(
  raw,
  { axios, yaml, notify, console },
  { name, url, interval, selected }
) {
  const params = yaml.parse(raw)
  const { proxies } = params

  const areaProxyGroup = schemaParse(proxies, areaSchema)
  const customProxyGroup = schemaParse(proxies, customSchema, {
    skip: false,
    target: 'object'
  })
  const areaProxyGroupName = areaProxyGroup.map(item => item.name)

  const proxyGroups = [
    {
      name: '🚀 节点选择',
      type: 'select',
      proxies: [
        '🗺 地区节点',
        'DIRECT',
        ...proxies.map(item => item.name)
      ]
    },
    {
      name: '🗺 地区节点',
      type: 'select',
      proxies: areaProxyGroupName
    },
    {
      name: '⬇️ 低倍节点',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择', ...(customProxyGroup['⬇️ 低倍节点']?.proxies || [])]
    },
    {
      name: '💬 人工智能',
      type: 'select',
      proxies: [
        ...(customProxyGroup['💬 人工智能']?.proxies || []),
        ...areaProxyGroupName,
        'DIRECT'
      ]
    },
    {
      name: '🎮 游戏平台',
      type: 'select',
      proxies: ['🚀 节点选择', 'DIRECT']
    },
    ...areaProxyGroup,
    {
      name: '🐟 漏网之鱼',
      type: 'select',
      proxies: ['🚀 节点选择', 'DIRECT']
    },
    {
      name: '🛑 全球拦截',
      type: 'select',
      proxies: ['REJECT', 'DIRECT']
    }
  ]

  return yaml.stringify(
    Object.assign(params, {
      dns,
      'proxy-groups': proxyGroups,
      'rule-providers': ruleProviders,
      rules
    })
  )
}

module.exports.parse = main
