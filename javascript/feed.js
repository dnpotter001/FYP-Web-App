const refreshFeed = document.getElementById("refresh-feed");

refreshFeed.addEventListener("click", () => {
  console.log("refresh");
  GenerateFeedItem();
});



function GenerateFeedItem(){
  let feedItem = document.createElement('article');
  feedItem.className = 'feed-item';

  let feedLabel = document.createElement('div');
  feedLabel.className = 'feed label';

  let feedGraph = document.createElement('figure');
  feedGraph.className = 'feed graph' ;

  let feedTable = document.createElement('article');
  feedTable.className = 'feed table';

  let feedInfo = document.createElement('div');
  feedInfo.className ='feed info';

  feedItem.appendChild(feedLabel);
  feedItem.appendChild(feedGraph);
  feedItem.appendChild(feedTable);
  feedItem.appendChild(feedInfo);
  document.getElementById('content').appendChild(feedItem);

}

