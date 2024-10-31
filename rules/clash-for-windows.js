module.exports.parse = async (raw, {axios, yaml, notify, console}, {name, url, interval, selected}) => {
  const params = yaml.parse(raw);

  const { proxies } = params

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
      '*.local',
      '*.qq.com'
    ],
    'default-nameserver': [
      '223.5.5.5',
      '119.29.29.29'
    ],
    nameserver: [
      '223.5.5.5',
      '119.29.29.29',
      'tls://223.5.5.5:853'
    ],
    fallback: [
      'https://1.0.0.1/dns-query',
      'https://doh.dns.sb/dns-query',
      'https://dns.cloudflare.com/dns-query',
      'https://dns.google/dns-query',
      'https://dns.twnic.tw/dns-query',
      'https://dns.quad9.net/dns-query',
      'tls://8.8.4.4:853'
    ],
    'fallback-filter': {
      geoip: true,
      'geoip-code': 'CN',
      ipcidr: ['240.0.0.0/4', '0.0.0.0/32']
    }
  }

  const regionsList = {
    '🇭🇰 香港节点': { reg: /^(?!.*游戏).*(香港|🇭🇰|HongKong|HK)+(.*)$/ },
    '🇨🇳 台湾节点': { reg: /^(?!.*游戏).*(台湾|🇨🇳|Taiwan|TW)+(.*)$/ },
    '🇯🇵 日本节点': { reg: /^(?!.*游戏).*(日本|🇯🇵|Japan|JP|东京)+(.*)$/ },
    '🇸🇬 新加坡节点': { reg: /^(?!.*游戏).*(新加坡|🇸🇬|Singapore|SG|狮城)+(.*)$/ },
    '🇰🇷 韩国节点': { reg: /^(?!.*游戏).*(韩国|🇰🇷|Korea|Kr)+(.*)/ },
    '🇺🇲 美国节点': { reg: /^(?!.*游戏).*(美国|🇺🇸|American|US)+(.*)$/ },
    '🏳️‍🌈 其他地区': { reg: /^(?!.*游戏).*/ }
  }
  const customProxies = {
    lowRate: { reg: /(?<![0-9])0\.[0-9]+|低倍/ },
    ai: { reg: /^(?!.*游戏).*(智能|ai|gpt)+(.*)/i },
    download: { reg: /^(?!.*游戏).*(下载|Download|p2p|bt|(?<![0-9])0\.[0-9]+)+(.*)/i }
  }
  proxies.forEach(proxy => {
    for (let key in regionsList) {
      const region = regionsList[key]
      !region.proxies && (region.proxies = [])
      if (region.reg.test(proxy.name)) {
        region.proxies.push(proxy.name)
        break
      }
    }

    for (let key in customProxies) {
      const custom = customProxies[key]
      !custom.proxies && (custom.proxies = [])
      custom.reg.test(proxy.name) && custom.proxies.push(proxy.name)
    }
  })
  const regionProxyGroups = Object.keys(regionsList).reduce((res, key) => {
    const {type = 'url-test', proxies} = regionsList[key]
    if (regionsList[key].proxies?.length) {
      res.push({
        name: key,
        type: type,
        url: 'http://www.gstatic.com/generate_204',
        interval: 300,
        tolerance: 50,
        proxies: proxies
      })
    }
    return res
  }, [])
  const regionProxyGroupNames = regionProxyGroups.map(regionProxyGroup => regionProxyGroup.name)

  const proxyGroups = [
    {
      name: '🚀 节点选择',
      type: 'select',
      proxies: ['🗺 地区节点', '🍭 低倍节点', 'DIRECT', ...proxies.map(item => item.name)]
    },
    {
      name: '🗺 地区节点', type: 'select',
      proxies: regionProxyGroupNames
    },
    {
      name: '🍭 低倍节点',
      type: 'select',
      proxies: [...customProxies.lowRate.proxies, 'DIRECT']
    },
    {
      name: '⬇️ 下载节点',
      type: 'select',
      proxies: [...customProxies.download.proxies, ...regionProxyGroupNames, 'DIRECT']
    },
    {
      name: '💬 人工智能',
      type: 'select',
      proxies: [...customProxies.ai.proxies, ...regionProxyGroupNames, 'DIRECT']
    },
    {
      name: '🎮 游戏平台',
      type: 'select',
      proxies: ['🚀 节点选择', 'DIRECT']
    },
    ...regionProxyGroups,
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
  const providers = {
    Direct: {
      type: 'http',
      behavior: 'classical',
      url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Direct/Direct.yaml',
      format: 'yaml',
      interval: 86400,
      path: './ruleset/Direct.yaml'
    },
    Lan: {
      type: 'http',
      behavior: 'classical',
      url: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/LocalAreaNetwork.yaml',
      format: 'yaml',
      path: './ruleset/Lan.yaml',
      interval: 86400
    },
    Apple: {
      type: 'http',
      behavior: 'classical',
      url: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Apple.yaml',
      format: 'yaml',
      path: './ruleset/Apple.yaml',
      interval: 86400
    },
    Microsoft: {
      type: 'http',
      behavior: 'classical',
      url: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Microsoft.yaml',
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
      url: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Google.yaml',
      format: 'yaml',
      path: './ruleset/Google.yaml',
      interval: '86400'
    },
    Telegram: {
      type: 'http',
      behavior: 'classical',
      url: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Providers/Ruleset/Telegram.yaml',
      format: 'yaml',
      path: './ruleset/Telegram.yaml',
      interval: 86400
    },
    GFW: {
      type: 'http',
      behavior: 'domain',
      url: 'https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/gfw.txt',
      path: './ruleset/GFW.yaml',
      interval: '86400'
    },
    ChinaIP: {
      type: 'http',
      behavior: 'ipcidr',
      url: 'https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/cncidr.txt',
      path: './ruleset/ChinaIP.yaml',
      interval: 8640
    }
  }
  const rules = [
    'DOMAIN-SUFFIX,ysepan.com,🚀 节点选择',
    'DOMAIN-SUFFIX,ys168.com,🚀 节点选择',
    'DOMAIN-SUFFIX,staticfile.net,🚀 节点选择',
    'DOMAIN-SUFFIX,jianguoyun.com,🚀 节点选择',
    'DOMAIN-SUFFIX,storage.googleapis.com,⬇️ 下载节点',
    'DOMAIN-SUFFIX,production.cloudflare.docker.com,⬇️ 下载节点',
    'DOMAIN-SUFFIX,download-cdn.jetbrains.com,⬇️ 下载节点',
    'DOMAIN-SUFFIX,bard.google.com,💬 人工智能',
    'RULE-SET,Direct,DIRECT',
    'RULE-SET,Lan,DIRECT',
    'RULE-SET,Download,DIRECT',
    'RULE-SET,OpenAI,💬 人工智能',
    'RULE-SET,Claude,💬 人工智能',
    'RULE-SET,Game,🎮 游戏平台',
    'RULE-SET,Apple,DIRECT',
    'RULE-SET,Microsoft,DIRECT',
    'RULE-SET,Google,🚀 节点选择',
    'RULE-SET,Telegram,🚀 节点选择',
    'RULE-SET,GFW,🚀 节点选择',
    'RULE-SET,ChinaIP,DIRECT,no-resolve',
    'GEOIP,CN,DIRECT,no-resolve',
    'MATCH,🐟 漏网之鱼'
  ]

  params['dns'] = dns
  params['proxy-groups'] = proxyGroups
  params['rule-providers'] = providers
  params['rules'] = rules

  return yaml.stringify(params)
}